import { LoginForm } from "@/components/forms/LoginForm"

export default async function LoginPage({searchParams}: {searchParams?: Promise<{redirect?: string}>}) {

  const params = await searchParams

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <LoginForm redirect = {params?.redirect}/>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block" style={{
        backgroundImage: `url(${'/images/tour-mate.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}>
     
      </div>
    </div>
  )
}