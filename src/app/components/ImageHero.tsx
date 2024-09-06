'use client'

import Image from 'next/image'
import { ImageShape } from './shapes/ImageShape'

type ImageHeroProps = {
  title: string
  description: string
  image: { url: string; alt: string }
  logo: boolean
}

export function ImageHero({ title, description, image, logo }: ImageHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-lg">{description}</p>
      <Image src={image.url} alt={image.alt} width={1000} height={1000} />
      {logo && <ImageShape />}
    </div>
  )
}
