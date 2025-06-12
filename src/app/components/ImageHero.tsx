'use client'

import { ImageShape } from './shapes/ImageShape'
import { useIsMobile } from '../hooks/use-mobile'
import { cn } from '../lib/utils'

type ImageHeroProps = {
  title: string
  description: string
  image: { url: string; alt: string; filename: string }
  logo: boolean
}

export function ImageHero({ title, description, image, logo }: ImageHeroProps) {
  const isMobile = useIsMobile(1024)
  return (
    <div
      className={cn(
        'grid grid-cols-5 grid-rows-2 items-start justify-items-start gap-y-10 bg-cover bg-center px-14 py-12 lg:min-h-[70vh] lg:p-20',
        logo ? 'min-h-[120vh]' : 'min-h-[60vh]',
      )}
      style={{
        backgroundImage: `url('${image.url}')`,
      }}
    >
      {logo ? (
        <h2 className="col-span-5 text-center text-3xl font-bold text-white lg:col-span-1 lg:text-5xl xl:text-7xl">
          {title}
        </h2>
      ) : (
        <h2 className="col-span-4 mb-8 text-4xl font-bold text-balance text-white lg:text-5xl xl:text-7xl">
          {title}
        </h2>
      )}
      <p className="col-span-5 row-start-2 self-end text-center text-2xl text-white lg:col-span-1 lg:self-start">
        {description}
      </p>
      {!isMobile && logo && (
        <div className="col-start-4 row-start-2 translate-y-10 scale-150">
          <ImageShape />
        </div>
      )}
    </div>
  )
}
