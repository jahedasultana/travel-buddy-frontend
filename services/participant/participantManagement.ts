import { serverFetch } from "@/lib/serverFetch";

// Get all host participant
export const getHostParticipant = async () => {
    try {
        const res = await serverFetch.get(`/participant/my-participants`)
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
