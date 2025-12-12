'use client'
import { userLogout } from '@/services/auth/userLogout'
import { Button } from './ui/button'

const LogoutUserButton = () => {

  // handle user logout
  const handleUserLogout = async() => {
    await userLogout()
  }

  return (
    <>
      <Button onClick={handleUserLogout} className="w-full cursor-pointer">Logout</Button>
    </>
  )
}

export default LogoutUserButton
