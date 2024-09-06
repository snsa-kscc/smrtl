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
      className="grid min-h-[70vh] grid-cols-3 grid-rows-2 items-end justify-items-start gap-y-10 bg-cover bg-center p-20"
      style={{
        backgroundImage: `url('${image.url}')`,
      }}
    >
      <h2 className="col-span-2 text-7xl font-bold text-white">{title}</h2>
      <p className="row-start-2 self-start text-lg text-white">{description}</p>
      {logo && (
        <div className="col-start-3 row-start-2 translate-y-10 scale-150">
          <ImageShape />
        </div>
      )}
    </div>
  )
}
