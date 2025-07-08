import Image from 'next/image'
import Link from 'next/link'
import { ImageShape } from './shapes/ImageShape'
import * as LucideIcons from 'lucide-react'

type BenefitsProps = {
  title: string
  subtitle: string
  image: {
    id: number
    alt: string
    url: string
    width: number
    height: number
  }
  benefitsBox: {
    icon: string
    title: string
    description: string
  }[]
  ctaLabel: string
  ctaUrl: string
}

export function Benefits({ title, subtitle, image, benefitsBox, ctaLabel, ctaUrl }: BenefitsProps) {
  return (
    // <div className="pb-10 lg:py-32">
    <div className="lg:pt-32">
      <div className="flex flex-col items-center gap-12 py-10 md:py-16 lg:mb-24 lg:flex-row lg:items-start lg:justify-between lg:px-24 lg:py-32 xl:px-32">
        <div className="grid w-full grid-cols-1 items-start lg:w-auto lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="z-0 col-start-1 row-start-1 w-32 justify-self-start opacity-45 lg:col-start-1 lg:row-start-1 lg:w-40 lg:justify-self-start lg:opacity-100">
            <ImageShape />
          </div>
          <div className="z-10 col-start-1 row-start-1 self-center pt-8 sm:pt-24 lg:col-start-2 lg:row-start-1 lg:pt-0">
            <h2 className="text-smartellLightPurple mb-5 text-center text-4xl font-bold text-balance lg:text-left lg:text-5xl xl:text-7xl">
              {title}
            </h2>
            <p className="text-smartellDarkBlue text-center text-2xl lg:text-left">{subtitle}</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            quality={100}
          />
        </div>
      </div>
      <div className="bg-smartellDarkBlue grid grid-cols-1 gap-16 px-6 py-16 md:grid-cols-2 md:py-40 lg:px-24 xl:px-32 2xl:grid-cols-4">
        {benefitsBox.map((benefit, index) => {
          const IconComponent = (LucideIcons as any)[benefit.icon]
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 p-8 transition-all"
            >
              {/* Link goes here */}
              <div className="bg-smartellDarkBlue hover:bg-smartellDarkBlue/70 block">
                <div className="mb-8 flex justify-center">
                  {IconComponent ? (
                    <IconComponent className="h-16 w-16 text-white" strokeWidth={1.5} />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-white/10" />
                  )}
                </div>
                <h3 className="text-smartellLightPurple mb-10 text-center text-2xl font-bold lg:text-4xl 2xl:text-3xl">
                  {benefit.title}
                </h3>
                <p className="text-lg text-white/90">{benefit.description}</p>
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className="mt-8 text-center lg:mt-24">
        <Link
          href={ctaUrl}
          className="bg-smartellDarkBlue hover:bg-smartellDarkBlue/90 inline-block cursor-pointer rounded-full px-16 py-4 text-xl font-bold text-white transition-colors"
        >
          {ctaLabel}
        </Link>
      </div> */}
    </div>
  )
}
