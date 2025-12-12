'use client'

import { serverFetch } from "@/lib/serverFetch";

// Get all my Travel Plan requests
export const fetchReviewablePlans  = async () => {
    try {
        const res = await serverFetch.get(`/review/reviewable-plans`)

        const result = await res.json()
        return result.data || { participantTrips: [], hostTrips: [] };

    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}


export const submitReview = async (payload: any) => {
  const res = await serverFetch.post("/review/", {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};