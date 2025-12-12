import { serverFetch } from "@/lib/serverFetch"

export const getAllUsers = async (queryString?: string) => {
    try {
        const res = await serverFetch.get(`/user${queryString ? `?${queryString}` : ''}`)
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