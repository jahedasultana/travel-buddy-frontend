import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Verified } from "lucide-react";

type TravelPlanCardProps = {
  travelPlan: {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budgetRange?: string;
    travelType: string;
    description?: string;
    visibility: boolean;
    user: {
      name: string;
      profileImage: string;
      currentLocation?: string;
      verifiedBadge?: boolean
    };
  };
};

const TravelPlanCard: React.FC<TravelPlanCardProps> = ({ travelPlan }) => {
  const { id, destination, startDate, endDate, budgetRange, travelType, description, visibility, user } = travelPlan;

  return (
    <Card className="hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden p-0 pb-3">
      {/* Header Image */}
      <div className="relative h-48 w-full">
        <div
          style={{
            backgroundImage: `url(${'/images/bg-banner/explore-traveler.jpg'})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        className="absolute inset-0 bg-opacity-30"></div>
        <div className="absolute bottom-2 left-4 z-10 text-white">
          <h3 className="text-xl font-semibold flex items-center gap-2">{user.name} {user?.verifiedBadge ? <Verified/> : ''}</h3>
          {user.currentLocation && <p className="text-sm">{user.currentLocation}</p>}
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <div className="flex flex-wrap justify-between items-center mb-2">
          <h4 className="text-lg font-bold text-gray-800">{destination}</h4>
          <Badge variant={visibility ? "default" : "outline"}>
            {visibility ? "Public" : "Private"}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-2">
          {description || "No description provided."}
        </p>

        <div className="flex justify-between items-center flex-wrap text-sm text-gray-500 mb-2">
          <span>
            <strong>Dates:</strong>{" "}
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </span>
          {budgetRange && <span><strong>Budget:</strong> {budgetRange}</span>}
        </div>

        <div className="flex gap-2 mt-5">
          <Badge variant="secondary">{travelType}</Badge>
          <Link href={`/travel-plans/${id}`} >
            <Button className="cursor-pointer">Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelPlanCard;
