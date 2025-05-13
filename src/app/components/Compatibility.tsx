import Image from 'next/image'
import { SupportShape } from './shapes/SupportShape'
import Link from 'next/link'

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
      <div className="bg-smartellDarkBlue px-20 pt-52">
        <h3 className="text-smartellLightPurple mx-auto w-2/3 text-center text-4xl font-bold text-balance lg:text-5xl xl:text-8xl">
          {title}
        </h3>
        <p className="mt-6 py-10 text-center text-2xl text-balance text-white">{description}</p>
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
      <div className="bg-smartellLightPurple flex flex-col items-center justify-center gap-12 px-10 pt-28 lg:flex-row lg:justify-between lg:px-20 lg:pt-44">
        <p className="text-smartellDarkBlue basis-1/2 text-center text-4xl font-bold text-balance lg:text-5xl xl:text-7xl">
          {ctaHook}
        </p>
        <div className="flex items-center justify-center lg:mr-20">
          <Link
            href={ctaUrl}
            className="text-smartellDarkBlue inline-block cursor-pointer rounded-full bg-white px-16 py-4 text-xl font-bold transition-colors duration-300 hover:bg-white/80"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </>
  )
}
