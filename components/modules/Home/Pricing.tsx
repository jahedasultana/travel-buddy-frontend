"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingSection() {
    const [yearly, setYearly] = useState(true);

    return (
        <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
                    <p className="text-gray-600 mt-2">Choose the plan that fits your travel needs.</p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <span className={!yearly ? "font-semibold" : "text-gray-500"}>Monthly</span>
                        {/* <Switch checked={yearly} onCheckedChange={setYearly} /> */}
                        <span className={yearly ? "font-semibold" : "text-gray-500"}>Yearly</span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Monthly */}
                    <div className={`p-8 rounded-3xl border shadow-sm bg-white transition-all ${!yearly ? "ring-2 ring-primary scale-[1.03]" : ""}`}>
                        <h3 className="text-2xl font-semibold mb-4">Monthly Plan</h3>
                        <p className="text-gray-600">Perfect for travelers exploring short-term.</p>

                        <div className="mt-6">
                            <span className="text-5xl font-bold">${yearly ? "10" : "10"}</span>
                            <span className="text-gray-500">/ month</span>
                        </div>

                        <ul className="mt-6 space-y-3 text-gray-600">
                            <li>Unlimited Travel Plans</li>
                            <li>Unlimited Join Requests</li>
                            <li>Access to Travel Buddies</li>
                            <li>Leave & Receive Reviews</li>
                        </ul>
                        <Link href={'/subscription'}>
                            <Button className="w-full mt-8 cursor-pointer">Choose Monthly</Button>
                        </Link>
                    </div>

                    <div className={`relative p-8 rounded-3xl border shadow-sm bg-white transition-all ${yearly ? "ring-2 ring-primary scale-[1.03]" : ""}`}>
                        <span className="absolute top-4 right-4 px-3 py-1 text-sm bg-primary text-white rounded-full">
                            Best Value
                        </span>

                        <h3 className="text-2xl font-semibold mb-4">Yearly Plan</h3>
                        <p className="text-gray-600">Get the full experience at the best price.</p>

                        <div className="mt-6">
                            <span className="text-5xl font-bold">${yearly ? "100" : "100"}</span>
                            <span className="text-gray-500">/ year</span>
                        </div>

                        <p className="text-green-600 mt-1 font-medium">Save $20 every year!</p>

                        <ul className="mt-6 space-y-3 text-gray-600">
                            <li>Everything in Monthly</li>
                            <li>Priority Support</li>
                            <li>Premium Badge on Profile</li>
                            <li>Early Access to New Features</li>
                        </ul>

                        <Link href={'/subscription'}>
                            <Button className="w-full mt-8 cursor-pointer">Choose Yearly</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
