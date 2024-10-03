import type { CollectionConfig, PayloadRequest } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 5,
    forgotPassword: {
      generateEmailSubject: ({ req, user }: { req?: PayloadRequest; user?: any } = {}) => {
        return `Hey ${user.email}, reset your password!`
      },
      generateEmailHTML: ({
        req,
        token,
        user,
      }: { req?: PayloadRequest; token?: string; user?: any } = {}) => {
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/next/reset-password?token=${token}`

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Reset your password</h1>
              <p>Hello, ${user.email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `
      },
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
