"use client"

import BlurText from "@/components/ui/blur-text";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/providers/AuthProvider";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)

    async function submit(e: React.FormEvent) {
        try {
            await forgotPassword(email);
        } catch (err: any) {
            setError(err.message)
        }
    }
    return (
        <div className="max-w-[1024px] min-h-screen mx-auto px-[24px] lg:px-0 pt-14">
            <div className="flex w-full max-w-sm mx-auto flex-col gap-6">
                <div className="flex justify-center">
                    <BlurText
                        text="Quicklist"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-2xl lg:text-3xl font-black text-[#FEEFDD]"
                    />
                </div>
                <Card className='bg-[#45413F] rounded-md px-2 py-3 shadow-xl'>
                    <form onSubmit={submit} className='flex flex-col space-y-6'>
                        <div className='flex flex-col justify-center text-center'>
                            <h1 className='text-xl font-semibold text-[#FEEFDD]'>Forgot Password</h1>
                            {/* <p className='text-[#D9CCBD] text-sm'>Login with your Facebook or Google account</p> */}
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
                            <div className='flex flex-col space-y-2'>
                                <Button
                                    type="submit"
                                    className="w-full bg-[#201E1F]"
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </div>

    )
}