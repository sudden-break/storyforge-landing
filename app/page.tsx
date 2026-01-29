import { Navigation } from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import TrustSection from '@/components/TrustSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

/**
 * Landing page - StoryForge.cloud
 *
 * Page structure (in order):
 * 1. Navigation (sticky, outside main)
 * 2. Hero
 * 3. Features (#features)
 * 4. How It Works (#how-it-works)
 * 5. Pricing (#pricing)
 * 6. FAQ (#faq)
 * 7. Trust Section (#trust)
 * 8. CTA Banner
 * 9. Footer
 */
export default function Home() {
  return (
    <>
      {/* Navigation - sticky, outside main for proper positioning */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <TrustSection />
        <CTABanner />
      </main>

      {/* Footer - outside main */}
      <Footer />
    </>
  );
}
