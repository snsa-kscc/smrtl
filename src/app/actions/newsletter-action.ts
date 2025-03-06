'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type EmailResponse = {
  success: boolean
  message: string
}

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData,
): Promise<EmailResponse> {
  const email = formData.get('email') as string

  try {
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      }
    }

    const { data, error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })

    if (!data || error) {
      throw new Error('Failed to subscribe to newsletter')
    }

    return { success: true, message: 'Successfully subscribed to newsletter' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Subscription failed' }
  }
}
