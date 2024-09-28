import { Suspense } from 'react'
import ResetPasswordPageClient from './page.client'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-2xl">Loading...</div>}>
      <ResetPasswordPageClient />
    </Suspense>
  )
}
