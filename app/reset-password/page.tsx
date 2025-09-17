'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { confirmPasswordReset } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const oobCode = searchParams.get('oobCode')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!oobCode) {
            setError('Invalid reset link.')
            return
        }
        try {
            await confirmPasswordReset(auth, oobCode, password)
            setMessage('Password reset successful! You can now log in.')
            setError(null)
            setPassword('')
            setTimeout(() => router.push('/'), 3000) // redirect to login after 3s
        } catch (err: any) {
            setError(err.message)
            setMessage(null)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
                <h1 className="text-lg font-semibold">Reset Password</h1>
                <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">Reset Password</Button>
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    )
}
