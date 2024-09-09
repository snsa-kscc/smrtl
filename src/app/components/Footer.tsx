import { getCachedGlobal } from '@/lib/getGlobals'

import type { Footer } from '../../payload-types'

export async function Footer() {
  const footer: any = await getCachedGlobal('footer')()
  return (
    <div className="bg-smartellDarkBlue px-20 py-8 text-smartellLightPurple">
      {footer.copyright}
    </div>
  )
}
