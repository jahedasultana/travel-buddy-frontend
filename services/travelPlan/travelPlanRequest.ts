'use server'
import { serverFetch } from "@/lib/serverFetch"

// Get all my Travel Plan requests
export const getMyPlanRequests = async () => {
    try {
        const res = await serverFetch.get(`/join-request/my-request`)
        const result = await res.json()
        return result.data || [];
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

// Get all Travel Plan requests that I sent
export const getMySentRequests = async () => {
    try {
        const res = await serverFetch.get(`/join-request/my-sent`)
        const result = await res.json()
        return result.data || [];
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}