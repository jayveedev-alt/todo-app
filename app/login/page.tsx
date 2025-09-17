'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await signIn(email, password)
            router.push('/') // redirect after login
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleLogin} className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md">
                <h1 className="text-xl font-semibold">Login</h1>
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
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? '...' : 'Login'}
                </Button>
                <div className="flex justify-between text-sm">
                    <Link href="/forgot-password" className="text-blue-600 hover:underline">
                        Forgot password?
                    </Link>
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Create account
                    </Link>
                </div>
            </form>
        </div>
    )
}
