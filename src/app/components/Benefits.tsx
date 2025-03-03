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
    <div className="px-6 py-24 md:px-12 lg:px-24 xl:px-32">
      <div className="mb-24 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-32 lg:w-40">
          <ImageShape />
        </div>
        <div className="max-w-3xl lg:ml-12">
          <h2 className="text-smartellLightPurple mb-8 text-center text-4xl font-bold lg:text-left lg:text-5xl xl:text-6xl">
            {title}
          </h2>
          <p className="text-center text-xl text-white/80 lg:text-left">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        {benefitsBox.map((benefit, index) => (
          <div
            key={index}
            className="group bg-smartellDarkBlue hover:bg-smartellDarkBlue/90 relative overflow-hidden rounded-xl border border-white/10 p-8 transition-all"
          >
            <h3 className="text-smartellLightPurple mb-6 text-center text-2xl font-bold lg:text-3xl">
              {benefit.title}
            </h3>
            <p className="mb-8 text-lg text-white/70">{benefit.description}</p>
            {benefit.image.url && (
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={benefit.image.url}
                  alt={benefit.image.alt}
                  width={benefit.image.width}
                  height={benefit.image.height}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-24 text-center">
        <Link
          href={ctaUrl}
          className="bg-smartellBlue hover:bg-opacity-90 inline-block rounded-lg px-12 py-5 text-xl font-medium text-white transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}
