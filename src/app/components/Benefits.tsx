import Image from 'next/image'
import Link from 'next/link'
import { ImageShape } from './shapes/ImageShape'

type BenefitsProps = {
  title: string
  subtitle: string
  images: {
    id: number
    alt: string
    url: string
    width: number
    height: number
  }[]
  benefitsBox: {
    title: string
    description: string
    image: {
      id: number
      alt: string
      url: string
      width: number
      height: number
    }
  }[]
  ctaLabel: string
  ctaUrl: string
}

export function Benefits({
  title,
  subtitle,
  images,
  benefitsBox,
  ctaLabel,
  ctaUrl,
}: BenefitsProps) {
  return (
    <div className="bg-smartellDarkBlue">
      <div className="mx-auto h-20 w-20">
        <ImageShape />
      </div>
      <p className="mx-auto w-1/2 pt-28 text-center text-balance text-white">{title}</p>
      <p className="mx-auto w-1/2 pt-4 text-center text-balance text-white">{subtitle}</p>
      <div className="flex flex-wrap justify-center">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-1/2 rounded-lg shadow-lg md:w-1/4 lg:w-1/6 xl:w-1/8 2xl:w-1/12"
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        {benefitsBox.map((benefit, index) => (
          <Link
            href={ctaUrl}
            key={index}
            className="w-1/2 rounded-lg shadow-lg md:w-1/4 lg:w-1/6 xl:w-1/8 2xl:w-1/12"
          >
            <p className="text-center text-balance text-white">{benefit.title}</p>
            <p className="text-center text-balance text-white">{benefit.description}</p>
            <Image
              src={benefit.image.url}
              alt={benefit.image.alt}
              width={benefit.image.width}
              height={benefit.image.height}
              className="w-full object-cover"
            />
          </Link>
        ))}
      </div>
      <div className="mx-auto w-1/2 pt-28 text-center text-balance text-white">
        <Link
          href={ctaUrl}
          className="bg-smartellBlue hover:bg-smartellBlue-light rounded-lg px-8 py-4 text-center text-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}
