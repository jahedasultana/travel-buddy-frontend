import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IUser } from "@/types/user.interface";
import Image from "next/image";
import { Verified } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const TravelerCard = ({ traveler }: {
  traveler: IUser
}) => {
  return (
    <div className="p-4 sm:p-6 w-full bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 border">
      <Card className="pt-0">
        <div
          style={{
            backgroundImage: `url(${'/images/bg-banner/travel-plans.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
          className="relative rounded-lg">
          <Image className="rounded-full" src={traveler?.profileImage || '/images/man.png'} width={100} height={100} alt={traveler?.name} />
        </div>
        <CardContent className="flex flex-col gap-2">
          {/* Traveler Name and Location */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">{traveler?.name} {traveler?.verifiedBadge && <Verified width={20} height={20} />}</h3>
            <span className="text-sm text-gray-500">({traveler?.currentLocation})</span>
          </div>

          {/* Traveler Interests */}
          <div className="text-sm text-gray-600 mb-2">
            <h4 className="font-semibold mb-2">Interests: {traveler?.interests?.length === 0 && 'No Interest'}</h4>
            <ul className="flex flex-wrap gap-2 mt-1">
              {traveler?.interests?.length > 0 ? traveler?.interests.map((interest, index) => {
                if (index + 1 < 4) {
                  return <li
                    key={index}
                    className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs"
                  >
                    {interest}
                  </li>
                }
              }): <></>}
            </ul>
          </div>

          {/* Traveler visited countries */}
          <div className="text-sm text-gray-600 mb-2">
            <h4 className="font-semibold mb-2">Visited Countries: {traveler?.visitedCountries?.length === 0 && 'No Country'}</h4>
            <ul className="flex flex-wrap gap-2 mt-1">
              {traveler?.visitedCountries?.length > 0 ? traveler?.visitedCountries.map((country, index) => {
                if (index + 1 < 4) {
                  return <li
                    key={index}
                    className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs"
                  >
                    {country}
                  </li>
                }
              }): <></>}
            </ul>
          </div>

          {/* Travel Plans */}
          <CardDescription>
            <Link href={`/traveler-profile/${traveler?.id}`}>
              <Button className="w-full cursor-pointer mt-2">View Profile</Button>
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerCard;
