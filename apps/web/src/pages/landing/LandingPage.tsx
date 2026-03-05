import LandingNavbar from '../../components/landing/LandingNavbar';
import LandingFooter from '../../components/landing/LandingFooter';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import ModulesSection from './sections/ModulesSection';
import HowItWorks from './sections/HowItWorks';
import PricingSection from './sections/PricingSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ModulesSection />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
