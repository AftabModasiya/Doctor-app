import LandingFooter from "../../components/landing/LandingFooter";
import LandingNavbar from "../../components/landing/LandingNavbar";
import CTASection from "./sections/CTASection";
import FeaturesSection from "./sections/FeaturesSection";
import HeroSection from "./sections/HeroSection";
import HowItWorks from "./sections/HowItWorks";
import ModulesSection from "./sections/ModulesSection";
// import PricingSection from "./sections/PricingSection";
// import TestimonialsSection from "./sections/TestimonialsSection";

export default function LandingPage() {
	return (
		<div className="min-h-screen">
			<LandingNavbar />
			<main>
				<HeroSection />
				<FeaturesSection />
				<ModulesSection />
				<HowItWorks />
				{/* <TestimonialsSection /> */}
				{/* <PricingSection /> */}
				<CTASection />
			</main>
			<LandingFooter />
		</div>
	);
}
