'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { applyActionCode } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const oobCode = searchParams.get('oobCode')
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')

    useEffect(() => {
        if (!oobCode) {
            setStatus('error')
            return
        }
        applyActionCode(auth, oobCode).then(() => {
            setStatus('success')
        }).catch(() => {
            setStatus('error')
        })
    }, [oobCode])

    return (
        <div className="flex min-h-screen items-center justify-center">
            {status === 'verifying' && <p>Verifying your email...</p>}
            {status === 'success' && <p>Email verified! You can now log in.</p>}
            {status === 'error' && <p>Invalid or expired verification link.</p>}
        </div>
    )
}
