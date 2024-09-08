import Image from 'next/image'
import { BrandsShape } from './shapes/BrandsShape'

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
    <div className="p-20">
      <h3 className="text-center text-6xl font-bold text-smartellDarkBlue">{title}</h3>
      <p className="mx-auto w-2/3 text-center text-6xl font-bold text-smartellDarkBlue">
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
              className="invert filter"
            />
          </div>
        ))}
      </div>
      <div className="mx-auto w-1/2">
        <BrandsShape />
      </div>
    </div>
  )
}
