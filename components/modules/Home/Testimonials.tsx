"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import 'swiper/css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "USA → Paris",
    image: "/images/woman.png",
    text: "I found the perfect travel buddy for my Europe trip. We explored Paris and Barcelona together — unforgettable memories!",
  },
  {
    id: 2,
    name: "Rifat Ahmed",
    location: "Bangladesh → Bali",
    image: "/images/man.png",
    text: "I was nervous about solo travel, but Travel Buddy matched me with someone who had similar interests. Amazing experience!",
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "Singapore → Tokyo",
    image: "/images/woman.png",
    text: "This platform helped me meet an amazing friend. It made my Japan trip feel safe, fun and exciting!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          What Travelers <span className="text-blue-600">Say</span>
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Real experiences from people who found companions for their trips.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        className="max-w-6xl mx-auto pb-10"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <Card className="shadow-md border rounded-2xl p-6 h-full hover:shadow-xl transition">
              <CardContent className="space-y-5">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover w-14 h-14"
                  />

                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  “{item.text}”
                </p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
