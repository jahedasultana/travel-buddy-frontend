

import { SignupForm } from "@/components/forms/SignupForm";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl max-h-screen">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block" style={{
        backgroundImage: `url(${'/images/tour-mate.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
     
      </div>
    </div>
  )
}