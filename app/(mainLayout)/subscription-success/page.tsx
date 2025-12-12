"use client"
export const dynamic = "force-dynamic";

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SubscriptionSuccess = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")

    const [loading, setLoading] = useState(true)
    const [verifiedSession, setVerifiedSession] = useState<boolean>(false)
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if (!sessionId) {
            setVerifiedSession(false)
            setLoading(false)
            return
        }

        // Verify payment
        const verifyPayment = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/subscription/verify-session?session_id=${sessionId}`
                )
                const data = await res.json()

                console.log(data)

                if (data?.success) {
                    setVerifiedSession(true)
                }

            } catch (err) {
                console.log('Error while verifying', err)
                setVerifiedSession(false)
            } finally {
                setLoading(false)
            }
        }

        verifyPayment()
    }, [sessionId])


    useEffect(() => {
        if (!verifiedSession) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
                    { credentials: "include" }
                );
                const userData = await res.json();

                console.log(userData, 'user data')

                if (userData?.data?.verifiedBadge) {
                    setIsPremium(true);
                    clearInterval(interval);
                }
            } catch (err) {
                console.log("Polling error:", err);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [verifiedSession]);

    console.log(verifiedSession, 'verified session')
    console.log(isPremium, 'is premium user')

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Verifying payment...
            </div>
        );
    }

    if (!verifiedSession) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Invalid Session</h3>
                    <p className="text-gray-600 mb-6">
                        We couldn’t verify your payment session.
                    </p>
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!isPremium) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-10 max-w-md w-full border border-white/50">
                    <div className="w-16 h-16 mx-auto border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-6"></div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Processing Your Subscription…
                    </h2>
                    <p className="text-gray-600">
                        Payment verified successfully.
                        Waiting for Stripe to activate your premium access…
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6">
            <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-white/50 animate-fadeIn">

                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Successful 🎉
                </h1>

                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Your subscription is now active.
                    Enjoy premium features instantly!
                </p>
                <Link href={'/'}>
                    <Button>Go to Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default SubscriptionSuccess
