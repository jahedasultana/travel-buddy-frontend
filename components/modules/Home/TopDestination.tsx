"use client";

import { Card, CardContent } from "@/components/ui/card";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "/images/home/top-destination/paris.jpg",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "/images/home/top-destination/indonesia.jpg",
  },
  {
    id: 3,
    name: "New York, USA",
    image: "/images/home/top-destination/new-york.jpg",
  },
  {
    id: 4,
    name: "Tokyo, Japan",
    image: "/images/home/top-destination/tokyo-japan.jpg", 
  },
];

export default function TopDestinations() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        ✈️ Top Travel Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <Card
            style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }}
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border-none shadow-md hover:shadow-xl h-[300px] hover:scale-[1.1] transition-all ease-in-out duration-300"
          >
            <CardContent className="p-0">

              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                {item.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
