'use server'
import { serverFetch } from "@/lib/serverFetch"

export const getUserById = async (id?: string) => {
    try {
        const res = await serverFetch.get(`/user/${id}`)
        const result = await res.json()
        return result.data || null
    }catch(error: any){
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` 
        }
    }
}

export const getTopRatedUser = async () => {
    try {
        const res = await serverFetch.get(`/user/top-rated`)
        const result = await res.json()
        return result.data || []
    }catch(error: any){
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` 
        }
    }
}