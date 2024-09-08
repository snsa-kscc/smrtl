import Image from 'next/image'
import { SupportShape } from './shapes/SupportShape'

type CompatibilityProps = {
  title: string
  description: string
  platform: {
    image: {
      id: number
      url: string
      alt: string
      width: number
      height: number
    }
  }[]
  ctaHook: string
  ctaLabel: string
  ctaUrl: string
}

export function Compatibility({
  title,
  description,
  platform,
  ctaHook,
  ctaLabel,
  ctaUrl,
}: CompatibilityProps) {
  return (
    <>
      <div className="bg-smartellDarkBlue px-20 pt-32">
        <h3 className="mx-auto w-1/3 text-balance text-center text-6xl font-bold text-white">
          {title}
        </h3>
        <p className="mt-6 text-balance text-center text-2xl font-bold text-white">{description}</p>
        <div className="mt-24 flex items-center justify-center gap-16">
          {platform.map((item) => (
            <div key={item.image.id}>
              <Image
                src={item.image.url}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-sm translate-x-1/3 translate-y-1/4">
          <SupportShape />
        </div>
      </div>
      <div className="flex justify-between bg-smartellLightPurple px-20 py-16">
        <p className="basis-1/3 text-balance text-4xl font-bold text-smartellDarkBlue">{ctaHook}</p>
        <div className="mr-20 flex items-center justify-center">
          <a
            href={ctaUrl}
            className="inline-block rounded-full bg-white px-7 py-3 text-smartellDarkBlue transition-colors duration-300 hover:bg-opacity-70"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </>
  )
}
