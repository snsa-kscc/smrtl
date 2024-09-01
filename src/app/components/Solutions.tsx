import Image from 'next/image'

type ImageType = {
  url: string
  alt: string
  width: number
  height: number
}

export function Solutions({
  title,
  industry,
}: {
  title: string
  industry: { name: string; image: ImageType }[]
}) {
  return (
    <div>
      <h3>
        {title.split('**').map((part, index) =>
          index % 2 === 0 ? (
            part
          ) : (
            <span key={index} className="text-smartellLightPurple">
              {part}
            </span>
          ),
        )}
      </h3>
      <div>
        {industry.map((item) => (
          <div key={item.name}>
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
