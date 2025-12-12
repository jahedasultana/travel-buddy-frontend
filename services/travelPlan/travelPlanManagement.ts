import { serverFetch } from "@/lib/serverFetch"
import { zodValidator } from "@/lib/zodValidator";
import { ITravelPlan, TravelType } from "@/types/travelPlan.interface";
import { travelPlanZodSchema, updateTravelPlanZodSchema } from "@/zod/travelPlan.zodSchema";

// Get all Travel Plans
export const getAllTravelPlans = async (queryString: string) => {
    try {
        const res = await serverFetch.get(`/travel-plan${queryString ? `?${queryString}` : ''}`)
        const result = await res.json()
        return result.data || null
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

// Get travel plan by id
export const getTravelPlanById = async (id: string) => {
    try {
        const res = await serverFetch.get(`/travel-plan/${id}`)
        const result = await res.json()
        return result.data || null
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

// Get my travel plan
export const getMyTravelPlan = async () => {
    try {
        const res = await serverFetch.get(`/travel-plan/my-plans`)
        const result = await res.json()
        console.log(result)
        return result.data || null
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

// Create Travel Plans
export async function createTravelPlan(
    prevState: any,
    formData: FormData
) {
    try {
        const payload = {
            destination: formData.get("destination") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            budgetRange: formData.get("budgetRange") as string,
            travelType: formData.get("travelType") as string,
            description: formData.get("description") as string,
            visibility:
                formData.get("visibility") === "false"
                    ? false
                    : true
        };

        if (zodValidator(payload, travelPlanZodSchema).success === false) {
            return zodValidator(payload, travelPlanZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, travelPlanZodSchema).data;

        const travelPlanData = {
            destination: validatedPayload.destination,
            startDate: new Date(validatedPayload.startDate),
            endDate: new Date(validatedPayload.endDate),
            budgetRange: validatedPayload.budgetRange ?? undefined,
            travelType: validatedPayload.travelType,
            description: validatedPayload.description ?? undefined,
            visibility: validatedPayload.visibility,
        };

        const res = await serverFetch.post('/travel-plan', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(travelPlanData)
        })

        const result = await res.json()

        return result

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        console.log('Error while creating travel plan', error)
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Travel plan creation failed."}` };
    }
}

// Update travel plan
export async function updateTravelPlan(id: string, _prevState: any, formData: any) {

    const travelTypeRaw = formData.travelType as string;
    const visibilityRaw = formData.visibility as string;

    const validationPayload: Partial<ITravelPlan> = {
        description: formData.description,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budgetRange: formData.budget,
        travelType: travelTypeRaw ? (travelTypeRaw as TravelType) : undefined,
        visibility: visibilityRaw === "true",
    };

    const validated = zodValidator(validationPayload, updateTravelPlanZodSchema);

    if (!validated.success && validated.errors) {
        return {
            success: false,
            message: "Travel Plan Validation failed",
            errors: validated.errors,
            formData: validationPayload,
        };
    }

    if (!validated.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    console.log(validated.data, 'my date val')

    try {
        const response = await serverFetch.patch(`/travel-plan/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validated.data),
        });

        const result = await response.json();
        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
            formData: validationPayload,
        };
    }
}