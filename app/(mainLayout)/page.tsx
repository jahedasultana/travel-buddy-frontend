import FindBuddyCTA from "@/components/modules/Home/FindBuddyCTA";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import PricingSection from "@/components/modules/Home/Pricing";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopDestinations from "@/components/modules/Home/TopDestination";
import TopRatedTravelers from "@/components/modules/Home/TopRatedTravelers";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div>
      <Hero/>
      <TopDestinations/>
      <FindBuddyCTA/>
      <TopRatedTravelers/>
      <HowItWorks/>
      <PricingSection/>
      <Testimonials/>
    </div>
  );
}
