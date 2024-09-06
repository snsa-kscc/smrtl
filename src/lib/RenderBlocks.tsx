import React, { Fragment } from 'react'
import type { Page } from '../payload-types'

import { Hero } from '../app/components/Hero'
import { QAndA } from '../app/components/QAndA'
import { Solutions } from '../app/components/Solutions'
import { Counter } from '../app/components/Counter'
import { Features } from '../app/components/Features'
import { ImageHero } from '../app/components/ImageHero'
import { IPTVSolutions } from '../app/components/IPTVSolutions'

const blockComponents: { [key: string]: React.ComponentType<any> } = {
  hero: Hero,
  'q-and-a': QAndA,
  solutions: Solutions,
  counter: Counter,
  features: Features,
  'image-hero': ImageHero,
  'iptv-solutions': IPTVSolutions,
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType] as React.ComponentType<any>

            if (Block) {
              return (
                <section className="my-24" key={index} data-name={blockName}>
                  <Block id={blockName} {...block} />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
