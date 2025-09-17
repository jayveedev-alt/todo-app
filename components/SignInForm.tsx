'use client'
import { signIn, signUp, signInWithGoogle, signInWithFacebook } from '@/providers/AuthProvider'
import React, { useState } from 'react'
import Card from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Icon } from "@iconify/react";
import Link from 'next/link'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            if (isRegister) {
                await signUp(email, password)
                setError("Check your email to verify your account before logging in.")
            } else {
                await signIn(email, password)
            }
        } catch (err: any) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <Card className='bg-[#45413F] rounded-md px-2 py-3 shadow-xl'>
            <form onSubmit={submit} className='flex flex-col space-y-6'>
                <div className='flex flex-col justify-center text-center'>
                    <h1 className='text-xl font-semibold text-[#FEEFDD]'>Welcome back</h1>
                    <p className='text-[#D9CCBD] text-sm'>Login with your Facebook or Google account</p>
                </div>
                <div className='flex flex-col space-y-2'>
                    <Button
                        type="button"
                        className='w-full'
                        variant="outline"
                        onClick={() => signInWithFacebook()}
                    >
                        <Icon icon="basil:facebook-solid" width="24" height="24" />
                        Login with Facebook
                    </Button>
                    <Button
                        type="button"
                        className='w-full'
                        variant="outline"
                        onClick={() => signInWithGoogle()}
                    >
                        <Icon icon="ri:google-fill" width="24" height="24" />
                        Login with Google
                    </Button>
                </div>
                <div className="after:border-[#201E1F] relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-[#201E1F] text-[#FEEFDD] relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm text-[#FEEFDD]" htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="quicklist@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='text-[#FEEFDD] bg-[#6A645E] w-full'
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <label className="text-sm text-[#FEEFDD]">Password</label>
                            <Link
                                href="/forgot-password"
                                className="ml-auto text-sm text-[#FEEFDD] underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='text-[#FEEFDD] bg-[#6A645E] w-full'
                            required
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <div className='flex flex-col space-y-2'>
                        <Button
                            type="submit"
                            className="w-full bg-[#201E1F]"
                            disabled={loading}
                        >
                            {loading ? '...' : (isRegister ? 'Register' : 'Login')}
                        </Button>
                        <Button
                            type="button"
                            className="w-full"
                            variant="outline"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Have an account?' : 'Create account'}
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    )

    // return (
    //     <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow">
    //         <h2 className="text-xl font-semibold mb-4">{isRegister ? 'Create account' : 'Sign in'}</h2>
    //         <form onSubmit={submit} className="space-y-3">
    //             <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
    //             <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    //             {error && <div className="text-red-500">{error}</div>}
    //             <div className="flex items-center gap-2">
    //                 <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white" disabled={loading}>{loading ? '...' : (isRegister ? 'Register' : 'Sign in')}</button>
    //                 <button type="button" className="px-3 py-2 rounded-lg border" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Have an account?' : 'Create account'}</button>
    //             </div>
    //         </form>
    //         <div className="mt-4">
    //             <button onClick={() => signInWithGoogle()} className="w-full px-4 py-2 rounded-lg border">Sign in with Google</button>
    //         </div>
    //     </div>
    // )
}