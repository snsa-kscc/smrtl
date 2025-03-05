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

export function HomeFooter({
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
      className="bg-smartellDarkBlue bg-right-top bg-no-repeat px-20 pt-6 pb-60"
      style={{ backgroundImage: `url('/assets/bg.svg')` }}
    >
      <h2 className="text-10xl text-smartellLightPurple font-bold">{title}</h2>
      <div className="mt-48 flex w-3/4 gap-8">
        <div className="basis-1/4">
          <h3 className="mb-8 font-bold text-white">{contactTitle}</h3>
          <p className="text-white">{email}</p>
          <p className="text-white">{phone}</p>
          <p className="text-white">{address}</p>
        </div>
        <div className="basis-1/3">
          <h3 className="mb-8 font-bold text-white">{infoTitle}</h3>
          <p className="text-white">Cookie Policy</p>
          <p className="text-white">Privacy Policy</p>
          <p className="text-white">Terms of Use</p>
        </div>
        <div className="basis-1/3">
          <h3 className="mb-12 font-bold text-white">{newsletterTitle}</h3>
          <div className="flex items-end justify-center gap-4">
            <hr className="h-1 w-full" />
            <button className="text-smartellDarkBlue hover:bg-opacity-70 rounded-full bg-white px-6 py-2 transition-colors duration-300">
              {newsletterButton}
            </button>
          </div>
          <p className="text-smartellLightPurple mt-2 text-xs">{newsletterDisclaimer}</p>
        </div>
      </div>
    </div>
  )
}
