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
    <div className="bg-smartellDarkBlue py-40">
      <h3 className="text-smartellLightPurple text-center text-4xl font-bold text-balance lg:text-5xl xl:text-7xl">
        {title}
      </h3>
      <p className="mx-auto w-2/3 pt-10 text-center text-4xl font-bold text-balance text-white lg:text-5xl xl:text-6xl">
        {description}
      </p>
      <div className="my-20 flex items-center justify-center gap-6">
        {brands.map((brand) => (
          <div key={brand.image.id} className="basis-12">
            <Image
              src={brand.image.url}
              alt={brand.image.alt}
              width={brand.image.width}
              height={brand.image.height}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
