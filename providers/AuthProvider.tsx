'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    signOut as fbSignOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    sendPasswordResetEmail,
    sendEmailVerification,
    confirmPasswordReset,
    updatePassword
} from 'firebase/auth'
import { auth, googleProvider, facebookProvider } from '../lib/firebase'

type User = any

const AuthContext = createContext({ user: null as User | null, loading: true })

const actionCodeSettings = {
  url: 'https://yourdomain.com/reset-password', 
  handleCodeInApp: true,
};

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) {
                if (u.emailVerified) {
                    setUser(u)
                } else {
                    // user not verified, force logout
                    setUser(null)
                    fbSignOut(auth)
                }
            } else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsub()
    }, [])


    const value = { user, loading }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Authentication functions

// Sign in with email + password
export async function signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password)
}

// Sign up with email + password + send verification
export async function signUp(email: string, password: string) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    if (userCred.user) {
        await sendEmailVerification(userCred.user)
        await fbSignOut(auth) // auto logout after registration
    }
    return userCred
}

// Google login
export async function signInWithGoogle() {
    return await signInWithPopup(auth, googleProvider)
}

// Facebook login
export async function signInWithFacebook() {
    return await signInWithPopup(auth, facebookProvider)
}

// Forgot password → send reset link
export async function forgotPassword(email: string) {
    return await sendPasswordResetEmail(auth, email)
}

// Reset password using oobCode from email link
export async function resetPassword(oobCode: string, newPassword: string) {
    return await confirmPasswordReset(auth, oobCode, newPassword)
}

// Change password for logged-in user
export async function changePassword(newPassword: string) {
    if (!auth.currentUser) throw new Error('No authenticated user')
    return await updatePassword(auth.currentUser, newPassword)
}

// Sign out
export function signOut() {
    return fbSignOut(auth)
}
