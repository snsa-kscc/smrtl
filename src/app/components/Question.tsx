'use client'

export function Question({
  title,
  firstSubtitle,
  secondSubtitle,
}: {
  title: string
  firstSubtitle: string
  secondSubtitle: string
}) {
  return (
    <div className="from-smartellDarkBlue to-smartellDarkBlue/85 bg-gradient-to-b px-4 py-10 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-24 lg:py-24 xl:px-32">
      <h2 className="xl:text-10xl text-smartellLightPurple mb-8 px-2 pt-6 text-center text-5xl font-bold text-balance sm:mb-12 sm:px-6 sm:pt-10 sm:text-6xl md:mb-16 md:px-10 md:pt-16 md:text-8xl lg:mb-20 lg:pt-20 lg:text-9xl">
        {title}
      </h2>
      <p className="mx-auto mb-8 w-full text-center text-xl font-bold text-white sm:mb-12 sm:w-5/6 sm:text-2xl md:mb-16 md:w-4/5 md:text-3xl lg:mb-20 lg:w-3/4 lg:text-4xl">
        {firstSubtitle}
      </p>
      <p className="mx-auto w-full text-center text-lg text-white sm:w-5/6 sm:text-xl md:w-4/5 md:text-2xl lg:w-3/4">
        {secondSubtitle}
      </p>
    </div>
  )
}
