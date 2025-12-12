import { serverFetch } from "@/lib/serverFetch"

const getLogedInUser = async () => {
    try {
        const res = await serverFetch.get('/auth/me')
        const user = await res.json()
        return user?.data
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error?.message : 'Something went wrong while getting logedin user'
        }
    }
}

export default getLogedInUser