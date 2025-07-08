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
      <h2
        className={cn(
          'col-span-5 justify-self-center text-center font-bold text-white lg:col-span-3 lg:justify-self-auto lg:text-left xl:col-span-4',
          logo
            ? 'text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:col-span-1'
            : 'text-4xl md:text-5xl lg:text-7xl',
        )}
      >
        {title}
      </h2>
      <p className="col-span-5 row-start-2 self-end text-center text-2xl text-white lg:col-span-2 lg:text-left 2xl:col-span-1 2xl:self-start">
        {description}
      </p>
      {!isMobile && logo && (
        <div className="col-start-4 row-start-2 translate-y-14 scale-150 self-end">
          <ImageShape />
        </div>
      )}
    </div>
  )
}
