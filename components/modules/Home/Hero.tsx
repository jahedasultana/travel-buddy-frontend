"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px]" />
      <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-[100px]" />

      <div className="container mx-auto px-5 grid lg:grid-cols-2 items-center py-16 md:py-22 relative z-10">

        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Explore The World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Together, Not Alone.
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-md">
            Find like-minded travelers going to your next destination.
            Create memories, make friends, and share the journey.
          </p>


          <Link href={'/travel-plans'}>
            <Button
              size="lg"
              className="mt-4 rounded-xl px-8 py-6 text-lg shadow-lg cursor-pointer"
            >
              Find Travel Buddies →
            </Button>
          </Link>
        </div>

        {/* Hero Illustration */}
        <div className="relative mt-10 lg:mt-0">
          <Image
            src="/images/home/tour-mate-2.jpg"
            alt="Travel Illustration"
            width={700}
            height={700}
            className="w-full drop-shadow-2xl animate-float rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
