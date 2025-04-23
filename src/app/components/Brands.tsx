import Image from 'next/image'

type BrandsProps = {
  title: string
  description: string
  brands: {
    image: {
      id: number
      alt: string
      url: string
      width: number
      height: number
    }
  }[]
}

export function Brands({ title, description, brands }: BrandsProps) {
  return (
    <div className="bg-smartellDarkBlue py-28">
      <h3 className="text-smartellLightPurple mx-auto w-2/3 text-center text-4xl font-bold text-balance lg:text-5xl xl:text-8xl">
        {title}
      </h3>
      <p className="mx-auto w-2/3 py-10 text-center text-3xl font-bold text-balance text-white lg:text-4xl xl:text-5xl">
        {description}
      </p>
      <div className="mx-auto my-12 flex max-w-4xl flex-col gap-10 px-4 md:flex-row">
        {brands.map((brand) => (
          <div key={brand.image.id} className="flex items-end">
            <Image
              src={brand.image.url}
              alt={brand.image.alt}
              width={brand.image.width}
              height={brand.image.height}
              className="w-full max-w-[120px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
