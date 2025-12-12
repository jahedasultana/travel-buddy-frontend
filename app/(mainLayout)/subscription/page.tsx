"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

type Plan = {
  name: string;
  price: string;
  features: string[];
  type: "monthly" | "yearly";
};

const plans: Plan[] = [
  {
    name: "Monthly Plan",
    price: "$10/mo",
    type: "monthly",
    features: [
      "Access to premium traveler profiles",
      "Verified badge",
      "Unlimited travel matches",
      "Priority support",
    ],
  },
  {
    name: "Yearly Plan",
    price: "$100/yr",
    type: "yearly",
    features: [
      "Access to premium traveler profiles",
      "Verified badge",
      "Unlimited travel matches",
      "Priority support",
      "Save 20% vs monthly",
    ],
  },
];

const Subscription = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscription = async (planType: "monthly" | "yearly") => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/subscription/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ plan: planType }),
      });

      const data = await res.json();

      if (data?.success) {
        window.location.href = data?.data?.url
      }

    } catch (err) {
      console.error('Something went wrong', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Choose Your Subscription Plan</h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Unlock premium features and get the most out of Travel Buddy & Meetup!
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full max-w-6xl">
        {plans.map((plan) => (
          <Card key={plan.name} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-gray-700 mt-2">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4 mt-4">
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {
                plan.type === 'monthly' ?
                  <Button
                    className="mt-6 w-full"
                    onClick={() => handleSubscription('monthly')}
                    disabled={loading && plan.type === 'monthly'}
                  >
                    {loading ? "Processing..." : `Subscribe to Monthly Plan`}
                  </Button>

                  :

                  <Button
                    className="mt-6 w-full"
                    onClick={() => handleSubscription('yearly')}
                    disabled={loading && plan.type === 'yearly'}
                  >
                    {loading ? "Processing..." : `Subscribe to Yearly Plan`}
                  </Button>
              }

            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-12 text-center max-w-md">
        Payments are secure and handled by Stripe. You can cancel anytime.
      </p>
    </div>
  );
};

export default Subscription;
