import { getTopRatedUser } from '@/services/user/userManagement';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';

interface Traveler {
  id: number;
  name: string;
  image: string;
  country: string;
  rating: number;
  trips: number;
}

const travelers: Traveler[] = [
  { id: 1, name: "Alice Johnson", image: "/images/home/toprated-travelers/traveler-1.jpg", country: "France", rating: 4.9, trips: 12 },
  { id: 2, name: "Mark Smith", image: "/images/home/toprated-travelers/traveler-2.jpg", country: "Italy", rating: 4.8, trips: 15 },
  { id: 3, name: "Sophia Lee", image: "/images/home/toprated-travelers/traveler-3.jpg", country: "Japan", rating: 4.7, trips: 8 },
  { id: 4, name: "Liam Brown", image: "/images/home/toprated-travelers/traveler-4.jpg", country: "Australia", rating: 4.9, trips: 20 },
];

export default async function TopRatedTravelers() {

  const topRatedTravelers = await getTopRatedUser()

  console.log(topRatedTravelers, 'rated')

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🌟 Top Rated Travelers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topRatedTravelers?.length > 0 && topRatedTravelers.map((traveler: any) => (
            <div
              key={traveler.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className='w-[200px] h-[200px] rounded-full'
                  style={{
                    backgroundImage: `url(${traveler?.profileImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                  }}
                >

                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">{traveler.name}</h3>
                <p className="text-gray-500 text-sm">{traveler.country}</p>
                <div className="flex justify-center items-center mt-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1 font-medium text-gray-700">{traveler?.
                    averageRating} (Avg Rating)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
