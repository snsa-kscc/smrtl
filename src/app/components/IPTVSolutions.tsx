import Image from 'next/image'

type IPTVBoxProp = {
  title: string
  description: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
}

export function IPTVSolutions({ title, IPTVBox }: { title: string; IPTVBox: IPTVBoxProp[] }) {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {IPTVBox.map((item, index) => (
          <div key={item.title}>
            <p>{String(index + 1).padStart(2, '0')}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
