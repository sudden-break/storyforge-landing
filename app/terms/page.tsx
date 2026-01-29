import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'Terms of Service - StoryForge',
  description: 'Terms of service for StoryForge Instagram Story Monitoring platform.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] py-16 md:py-24">
      <Container size="lg" padding="md">
        <SectionHeader
          title="Terms of Service"
          subtitle="By using StoryForge, you agree to these terms. Please read them carefully."
          size="lg"
          align="left"
          maxWidth="none"
        />

        <div className="mt-12 space-y-8 text-[#A0A0A0]">
          {/* Notice Banner */}
          <div className="rounded-lg bg-[#FFD23F]/10 border border-[#FFD23F]/30 p-4">
            <p className="text-[#FFD23F] font-medium mb-2">Placeholder Notice</p>
            <p className="text-sm">
              This is a placeholder terms of service document. A comprehensive legal agreement will be added before the
              official launch. For now, this page exists to prevent 404 errors.
            </p>
          </div>

          {/* Sections */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h3>
            <p className="leading-relaxed">
              By accessing or using StoryForge, you agree to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">2. Service Description</h3>
            <p className="leading-relaxed">
              StoryForge provides Instagram Story monitoring and AI-powered content generation services. We monitor
              publicly available stories and generate content suggestions based on your preferences.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h3>
            <p className="leading-relaxed">
              You are responsible for maintaining the security of your account credentials and for all activities that
              occur under your account. You must comply with Instagram's Terms of Use when using our service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">4. Prohibited Activities</h3>
            <p className="leading-relaxed">
              You may not use StoryForge to harass others, infringe on intellectual property rights, or violate any
              applicable laws or regulations. Misuse of the service may result in account termination.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">5. Subscription & Billing</h3>
            <p className="leading-relaxed">
              StoryForge offers both free and paid subscription tiers. Paid subscriptions are billed according to the
              selected plan. You may cancel your subscription at any time.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">6. Service Availability</h3>
            <p className="leading-relaxed">
              We strive for 99% uptime but cannot guarantee uninterrupted service. Instagram API changes or rate limits
              may temporarily affect service functionality.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h3>
            <p className="leading-relaxed">
              StoryForge is provided &quot;as is&quot; without warranties. We shall not be liable for indirect, incidental,
              or consequential damages arising from use of the service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">8. Termination</h3>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your
              right to use the service will immediately cease.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">9. Governing Law</h3>
            <p className="leading-relaxed">
              These terms are governed by EU law. Any disputes shall be resolved in accordance with applicable EU
              regulations.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">10. Contact</h3>
            <p className="leading-relaxed">
              For questions about these terms, please contact us at{' '}
              <a href="mailto:legal@storyforge.cloud" className="text-[#FFD23F] hover:underline">
                legal@storyforge.cloud
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Last updated: January 2026 | These terms will be updated before official launch.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
