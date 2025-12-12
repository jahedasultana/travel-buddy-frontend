"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Map, Users } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description:
      "Create your free account in minutes and set up your travel profile.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Create Your Travel Plan",
    description:
      "Add your destination, dates, budget, interests and more.",
    icon: Map,
  },
  {
    id: 3,
    title: "Find Your Perfect Buddy",
    description:
      "Match with travelers going to the same destination and connect instantly.",
    icon: Users,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It <span className="text-blue-600">Works</span>
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Start your journey in just three simple steps.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <Card
            key={step.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-none"
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <step.icon size={32} />
              </div>

              <h3 className="text-xl font-semibold">{step.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>

              <span className="font-semibold text-sm opacity-70">
                Step {step.id}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
