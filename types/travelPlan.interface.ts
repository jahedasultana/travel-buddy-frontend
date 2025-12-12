import { IUser } from "./user.interface";

export interface ITravelPlan {
  id: string;
  title: string;
  description?: string | null;

  destination: string;
  
  startDate: string;
  endDate: string;

  budgetRange: string;

  createdAt: string;
  updatedAt: string;

  travelType: string;
  visibility: boolean;

  userId: string;

  user: IUser;
}


export enum TravelType {
  SOLO = "SOLO",
  FAMILY = "FAMILY",
  FRIENDS = "FRIENDS",
}