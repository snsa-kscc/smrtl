type FooterProps = {
  title: string
  contactTitle: string
  email: string
  phone: string
  address: string
  infoTitle: string
  newsletterTitle: string
  newsletterButton: string
  newsletterDisclaimer: string
}

export function Footer({
  title,
  contactTitle,
  email,
  phone,
  address,
  infoTitle,
  newsletterTitle,
  newsletterButton,
  newsletterDisclaimer,
}: FooterProps) {
  return (
    <div
      className="bg-smartellDarkBlue bg-right-top bg-no-repeat px-20 pb-60 pt-6"
      style={{ backgroundImage: `url('/assets/bg.svg')` }}
    >
      <h2 className="text-10xl font-bold text-smartellLightPurple">{title}</h2>
      <div className="mt-48 flex w-3/4 gap-8">
        <div className="basis-1/4">
          <h3 className="mb-8 font-bold text-white">{contactTitle}</h3>
          <p className="text-white">{email}</p>
          <p className="text-white">{phone}</p>
          <p className="text-white">{address}</p>
        </div>
        <div className="basis-1/3">
          <h3 className="mb-8 font-bold text-white">{infoTitle}</h3>
        </div>
        <div className="basis-1/3">
          <h3 className="mb-12 font-bold text-white">{newsletterTitle}</h3>
          <div className="flex items-end justify-center gap-4">
            <hr className="h-1 w-full" />
            <button className="rounded-full bg-white px-6 py-2 text-smartellDarkBlue transition-colors duration-300 hover:bg-opacity-70">
              {newsletterButton}
            </button>
          </div>
          <p className="mt-2 text-xs text-smartellLightPurple">{newsletterDisclaimer}</p>
        </div>
      </div>
    </div>
  )
}
