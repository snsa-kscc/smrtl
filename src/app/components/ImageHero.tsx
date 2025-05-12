'use client'

import { ImageShape } from './shapes/ImageShape'

type ImageHeroProps = {
  title: string
  description: string
  image: { url: string; alt: string; filename: string }
  logo: boolean
}

export function ImageHero({ title, description, image, logo }: ImageHeroProps) {
  return (
    <div
      className="grid min-h-[60vh] grid-cols-5 grid-rows-2 items-end justify-items-start gap-y-10 bg-cover bg-center p-20 lg:min-h-[70vh]"
      style={{
        backgroundImage: `url('${image.url}')`,
      }}
    >
      {logo ? (
        <h2 className="text-smartellLightPurple mb-8 text-4xl font-bold lg:text-5xl xl:text-7xl">
          {title}
        </h2>
      ) : (
        <h2 className="col-span-4 mb-8 text-4xl font-bold text-balance text-white lg:text-5xl xl:text-7xl">
          {title}
        </h2>
      )}
      <p className="row-start-2 self-start text-2xl text-white">{description}</p>
      {logo && (
        <div className="col-start-3 row-start-2 translate-y-10 scale-150">
          <ImageShape />
        </div>
      )}
    </div>
  )
}
