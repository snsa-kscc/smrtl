import { getGlobal } from '../lib/getGlobals'

import type { Footer } from '../../payload-types'

export async function Footer() {
  const footer: Footer = (await getGlobal('footer')) as Footer
  return (
    <div className="bg-smartellDarkBlue px-20 py-8 text-smartellLightPurple">
      {footer.copyright}
    </div>
  )
}
