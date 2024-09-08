import Image from 'next/image'

type ReferalsProps = {
  name: string
  role: string
  message: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
}

export function Referals({ title, referals }: { title: string; referals: ReferalsProps[] }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-16 text-center text-4xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {referals.map((referal) => (
            <div key={referal.name} className="rounded-lg bg-gray-100 p-8">
              <Image
                src={referal.image.url}
                alt={referal.image.alt}
                width={referal.image.width}
                height={referal.image.height}
              />
              <h3 className="mt-4 text-2xl font-bold">{referal.name}</h3>
              <p className="mt-2 text-gray-700">{referal.role}</p>
              <p className="mt-2 text-gray-700">{referal.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
