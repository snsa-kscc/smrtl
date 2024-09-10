import { getGlobal } from '../lib/getGlobals'

import type { Footer } from '../../payload-types'

export async function Footer() {
  const footer: any = await getGlobal('footer')
  return (
    <div className="bg-smartellDarkBlue px-20 py-8 text-smartellLightPurple">
      {footer.copyright}
    </div>
  )
}
