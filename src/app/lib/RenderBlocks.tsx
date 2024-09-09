import React, { Fragment } from 'react'
import type { Page } from '../../payload-types'

import { Hero } from '../components/Hero'
import { QAndA } from '../components/QAndA'
import { Solutions } from '../components/Solutions'
import { Counter } from '../components/Counter'
import { Features } from '../components/Features'
import { ImageHero } from '../components/ImageHero'
import { IPTVSolutions } from '../components/IPTVSolutions'
import { Compatibility } from '../components/Compatibility'
import { Brands } from '../components/Brands'
import { Referals } from '../components/Referals'
import { HomeFooter } from '../components/HomeFooter'
import { ArchiveBlock } from '../components/ArchiveBlock'

const blockComponents: { [key: string]: React.ComponentType<any> } = {
  hero: Hero,
  archive: ArchiveBlock,
  'q-and-a': QAndA,
  solutions: Solutions,
  counter: Counter,
  features: Features,
  'image-hero': ImageHero,
  'iptv-solutions': IPTVSolutions,
  compatibility: Compatibility,
  brands: Brands,
  referals: Referals,
  'home-footer': HomeFooter,
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
                <section key={index} data-name={blockName}>
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
