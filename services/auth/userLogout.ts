'use server'
import { deleteCookie } from "@/utils/tokenHandler"
import { redirect } from "next/navigation"

  export const userLogout = async () => {
    await deleteCookie('accessToken')
    await deleteCookie('refreshToken')
    redirect('/login')
  }