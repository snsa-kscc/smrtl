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
    <div className="bg-smartellDarkBlue py-20">
      <h3 className="text-smartellLightPurple text-center text-3xl font-bold text-balance lg:text-4xl xl:text-5xl">
        {title}
      </h3>
      <p className="mx-auto w-2/3 pt-6 text-center text-3xl font-bold text-balance text-white lg:text-4xl xl:text-5xl">
        {description}
      </p>
      <div className="mx-auto my-12 flex max-w-4xl flex-col gap-8 px-4">
        <div className="flex justify-evenly">
          {brands.slice(0, 3).map((brand, index) => (
            <div key={index} className="flex items-center">
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

        <div className="flex justify-evenly">
          {brands.slice(3, 5).map((brand, index) => (
            <div key={index + 3} className="flex items-center">
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

        <div className="flex justify-center">
          {brands.slice(5, 6).map((brand, index) => (
            <div key={index + 5} className="flex items-center">
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
    </div>
  )
}
