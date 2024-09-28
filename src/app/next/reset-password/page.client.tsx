'use client'

import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { resetPassword } from './actions'

export default function ResetPasswordPageClient() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!token) {
      setError('Invalid reset token')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    startTransition(async () => {
      const result = await resetPassword(token, password)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'An error occurred')
      }
    })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900 font-sans">
      <h1 className="py-8 text-4xl font-bold text-white">Reset Password</h1>
      {success ? (
        <div className="text-green-500" role="alert">
          Password reset successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-md">
            <label htmlFor="password" className="sr-only">
              New password
            </label>
            <input
              id="password"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white"
              required
              aria-required="true"
            />
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white"
              required
              aria-required="true"
            />
          </div>
          {error && (
            <div className="text-red-500" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full max-w-md rounded-md bg-blue-500 p-2 text-white disabled:opacity-50"
            aria-busy={isPending}
          >
            {isPending ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
      )}
    </div>
  )
}
