'use client'

type IPTVBoxProp = {
  title: string
  description: string
}

export function IPTVSolutions({
  title,
  firstSubtitle,
  secondSubtitle,
  IPTVBox,
}: {
  title: string
  firstSubtitle: string
  secondSubtitle: string
  IPTVBox: IPTVBoxProp[]
}) {
  return (
    <div className="relative px-20 py-10">
      <h3 className="text-smartellDarkBlue mb-20 text-lg font-bold">{title}</h3>
      <p>{firstSubtitle}</p>
      <p>{secondSubtitle}</p>
      {IPTVBox.map((item, index) => (
        <div key={item.title} className="my-10">
          <p className="text-smartellLightPurple">{String(index + 1).padStart(2, '0')}</p>
          <div className="my-20 flex items-center justify-center gap-4">
            <h3 className="text-smartellDarkBlue basis-1/2 text-7xl font-bold">{item.title}</h3>
            <p className="text-smartellDarkBlue basis-1/2">
              {item.description.split('**').map((part, index) =>
                index % 2 === 0 ? (
                  part
                ) : (
                  <span key={index} className="font-bold">
                    {part}
                  </span>
                ),
              )}
            </p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}
