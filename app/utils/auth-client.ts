import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://travelbuddybackend.vercel.app/api/auth",
    plugins: [
        emailOTPClient()
    ]
})

export const { signIn, signUp, signOut, useSession, emailOtp } = authClient;
