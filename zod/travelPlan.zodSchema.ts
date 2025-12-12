import { TravelType } from '@/types/travelPlan.interface';
import z from 'zod'

export const travelPlanZodSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budgetRange: z.string().optional().nullable(),
  travelType: z.nativeEnum(TravelType, 'Travel type is required'),
  description: z.string().optional().nullable(),
  visibility: z.boolean().default(true),
});


export const updateTravelPlanZodSchema = z.object({
  destination: z.string().min(1, "Destination is required").optional(),
  startDate: z.string().min(1, "Start date is required").optional(),
  endDate: z.string().min(1, "End date is required").optional(),
  budgetRange: z.string().optional().nullable(),
  travelType: z.nativeEnum(TravelType, 'Travel type is required').optional(),
  description: z.string().optional().nullable(),
  visibility: z.boolean().optional(),
});
