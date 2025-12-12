import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function FindBuddyCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">

        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Find Your Perfect <span className="text-blue-600">Travel Buddy</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            No more solo adventures unless you want to! Match with travelers who share your destination, dates, and interests.
          </p>

          <Link href={'/travel-plans'}>
            <Button size="lg" className="px-8 py-6 text-lg rounded-xl cursor-pointer">
              Start Finding Buddies →
            </Button>
          </Link>
        </div>

        {/* Illustration */}
        <div className="relative">
          <Image
            src="/images/home/find-buddy.jpg"
            alt="Find Travel Buddy Illustration"
            width={600}
            height={600}
            className="w-full drop-shadow-xl rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}
