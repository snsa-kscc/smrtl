'use server'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function resetPassword(token: string, password: string) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const result = await payload.resetPassword({
      collection: 'users',
      data: {
        token,
        password,
      },
      overrideAccess: true,
    })

    if (result.user) {
      return { success: true, user: result.user }
    } else {
      throw new Error('Password reset failed')
    }
  } catch (error) {
    console.error('Password reset error:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred during password reset'
    return { success: false, error: errorMessage }
  }
}
