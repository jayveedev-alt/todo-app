'use client'
import { useState } from 'react'
import { signUp } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            await signUp(email, password)
            setMessage('Verification email sent! Please check your inbox before logging in.')
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleRegister} className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md">
                <h1 className="text-xl font-semibold">Create Account</h1>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-600">{error}</p>}
                {message && <p className="text-green-600">{message}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? '...' : 'Register'}
                </Button>
                <div className="text-sm text-center">
                    <span>Already have an account? </span>
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
