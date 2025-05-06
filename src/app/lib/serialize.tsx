import React, { Fragment, JSX } from 'react'
import Image from 'next/image'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { readingTimeTranslations, Locale } from 'i18n.config'
import { CMSLink } from '@/app/components/Link'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import type { Page } from '@/payload-types'

// Define the link node structure
interface SerializedLinkNode {
  type: 'link'
  version?: number
  url?: string
  children?: NodeTypes[]
  fields?: {
    linkType?: 'custom' | 'internal'
    newTab?: boolean
    url?: string
    doc?: {
      relationTo: string
      value: any
    }
  }
}

// Define the upload node structure for PayloadCMS media
interface SerializedUploadNode {
  type: 'upload'
  value: {
    id: string
    url: string
    filename: string
    mimeType: string
    filesize: number
    width?: number
    height?: number
    alt?: string
    quality?: number
  }
  relationTo: string
  fields?: Record<string, any>
  children?: NodeTypes[]
}

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedLinkNode
  | SerializedUploadNode
  | SerializedBlockNode<
      // @ts-ignore // TODO: Fix this
      | Extract<Page['layout'][0], { blockType: 'cta' }>
      // @ts-ignore // TODO: Fix this
      | Extract<Page['layout'][0], { blockType: 'mediaBlock' }>
    >

type Props = {
  nodes: NodeTypes[]
  includeReadingTime?: boolean
  lang: Locale
}

/**
 * Extracts plain text content from Lexical nodes for reading time calculation
 */
function extractTextFromNodes(nodes: NodeTypes[]): string {
  let text = ''

  nodes?.forEach((node) => {
    if (node == null) return

    if (node.type === 'text') {
      text += node.text || ''
    }

    if ('children' in node && node.children) {
      text += extractTextFromNodes(node.children as NodeTypes[])
    }
  })

  return text
}

/**
 * Calculates reading time in minutes based on words count
 * Average reading speed is 200-250 words per minute
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225
  const wordCount = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  // Return at least 1 minute for very short content
  return Math.max(1, readingTime)
}

export function serializeLexical({ nodes, includeReadingTime = false, lang }: Props): JSX.Element {
  // Calculate reading time if requested
  const textContent = includeReadingTime ? extractTextFromNodes(nodes) : ''
  const readingTimeMinutes = includeReadingTime ? calculateReadingTime(textContent) : 0
  return (
    <Fragment>
      {includeReadingTime && (
        <div className="reading-time mb-6 text-sm text-gray-600">
          <span>
            {readingTimeTranslations[lang]}
            {readingTimeMinutes} min
          </span>
        </div>
      )}
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[], lang })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }
        } else {
          switch (node.type) {
            case 'linebreak': {
              return <br key={index} />
            }
            case 'paragraph': {
              return (
                <p className="text-lg" key={index}>
                  {serializedChildren}
                </p>
              )
            }
            case 'heading': {
              const Tag = node?.tag
              return <Tag key={index}>{serializedChildren}</Tag>
            }
            case 'list': {
              const Tag = node?.tag
              return (
                <Tag className="list text-lg" key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case 'listitem': {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? 'true' : 'false'}
                    className={` ${node.checked ? '' : ''}`}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                )
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }

            // case 'link': {
            //   // For PayloadCMS Lexical links
            //   if ('fields' in node && node.fields) {
            //     const { linkType, newTab, url, doc } = node.fields

            //     let href = '#'
            //     if (linkType === 'custom' && url) {
            //       href = url
            //     } else if (linkType === 'internal' && doc) {
            //       // Handle internal links based on the doc reference
            //       // This would typically be a path to another page in your CMS
            //       const docValue = doc.value as any
            //       const docId = docValue?.id || ''
            //       href = `/${doc.relationTo}/${docId}`
            //     }

            //     return (
            //       <a
            //         href={href}
            //         key={index}
            //         target={newTab ? '_blank' : '_self'}
            //         rel={newTab ? 'noopener noreferrer' : undefined}
            //       >
            //         {serializedChildren}
            //       </a>
            //     )
            //   }

            //   // Fallback for standard Lexical links or if fields are missing
            //   return (
            //     <a href={'#'} key={index} rel="noopener noreferrer">
            //       {serializedChildren}
            //     </a>
            //   )
            // }

            case 'link':
            case 'autolink': {
              //const node = _node as SerializedLinkNode

              const fields = node.fields

              return (
                <CMSLink
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  reference={fields?.doc as any}
                  type={fields?.linkType === 'internal' ? 'reference' : 'custom'}
                  url={fields?.url}
                >
                  {serializedChildren}
                </CMSLink>
              )
            }

            case 'quote': {
              return (
                <blockquote
                  className="mb-8 border-l-2 border-gray-600 pl-6 text-lg font-light italic"
                  key={index}
                >
                  {serializedChildren}
                </blockquote>
              )
            }
            // Images are handled via the 'upload' case
            case 'upload': {
              // Handle upload media nodes from PayloadCMS
              if (node.value && typeof node.value === 'object') {
                // Safe type checking for media properties
                const mediaValue = node.value as {
                  url?: string
                  alt?: string
                  width?: number
                  height?: number
                  filename?: string
                }

                // Only render if we have a URL
                if (mediaValue.url) {
                  return (
                    <div className="pb-8" key={index}>
                      <Image
                        src={mediaValue.url}
                        alt={mediaValue.alt || ''}
                        width={mediaValue.width || 800}
                        height={mediaValue.height || 600}
                        className="h-auto max-w-full"
                        quality={100}
                      />
                      {node.fields?.caption && (
                        <figcaption className="mt-2 text-sm text-gray-600">
                          {node.fields.caption}
                        </figcaption>
                      )}
                      <div className="my-4 border-l-2 border-gray-600 pl-2">
                        <p className="text-gray--600 !py-1 text-sm">{mediaValue.alt}</p>
                      </div>
                    </div>
                  )
                }
              }
              return null
            }

            default:
              return null
          }
        }

        return null // Add this line at the end of the function
      })}
    </Fragment>
  )
}
