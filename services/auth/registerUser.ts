'use server'
import { zodValidator } from '@/lib/zodValidator';
import { userLogin } from './userLogin';
import { registerUserZodSchema } from '@/zod/auth.zodSchema';
import { serverFetch } from '@/lib/serverFetch';

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            gender: formData.get("gender"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            bio: formData.get("bio"),
            currentLocation: formData.get("currentLocation"),
        };

        if (zodValidator(payload, registerUserZodSchema).success === false) {
            return zodValidator(payload, registerUserZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserZodSchema).data;

        const registerData = {
            name: validatedPayload.name,
            email: validatedPayload.email,
            password: validatedPayload.password,
            gender: validatedPayload.gender,
            bio: validatedPayload.bio,
            currentLocation: validatedPayload.currentLocation
        }

        const newFormData = new FormData()
        newFormData.append('data', JSON.stringify(registerData))

        if (formData.get('profileImage')) {
            newFormData.append('file', formData.get('profileImage') as Blob)
        }

        const res = await serverFetch.post('/user/create-user', {
            body: newFormData
        })

        const result = await res.json()

        if (result.success) {
            await userLogin(_currentState, formData);
        }

        return result

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        console.log('Error while registering patient', error)
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}