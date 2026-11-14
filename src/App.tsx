import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import HeroSection from '@/sections/HeroSection';
import TrustStrip from '@/sections/TrustStrip';
import BusinessCase from '@/sections/BusinessCase';
import DecisionModel from '@/sections/DecisionModel';
import EventJourney from '@/sections/EventJourney';
import HowItWorks from '@/sections/HowItWorks';
import PlatformSection from '@/sections/PlatformSection';
import UseCases from '@/sections/UseCases';
import IntegrationsSection from '@/sections/IntegrationsSection';
import ReverseEtlSection from '@/sections/ReverseEtlSection';
import DeploymentSection from '@/sections/DeploymentSection';
import SecuritySection from '@/sections/SecuritySection';
import FaqSection from '@/sections/FaqSection';
import AccessCta from '@/sections/AccessCta';
import { useReveal } from '@/lib/useReveal';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { useSpotlight } from '@/lib/useSpotlight';

export default function App() {
  useReveal();
  useScrollProgress();
  useSpotlight();

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <TrustStrip />
        <BusinessCase />
        <PlatformSection />
        <DecisionModel />
        <EventJourney />
        <HowItWorks />
        <IntegrationsSection />
        <ReverseEtlSection />
        <DeploymentSection />
        <SecuritySection />
        <UseCases />
        <FaqSection />
        <AccessCta />
      </main>

      <SiteFooter />
    </>
  );
}
