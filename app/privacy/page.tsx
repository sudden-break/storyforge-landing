import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'Privacy Policy - StoryForge',
  description: 'Privacy policy for StoryForge Instagram Story Monitoring platform.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] py-16 md:py-24">
      <Container size="lg" padding="md">
        <SectionHeader
          title="Privacy Policy"
          subtitle="Your privacy is important to us. This policy outlines how we collect, use, and protect your data."
          size="lg"
          align="left"
          maxWidth="none"
        />

        <div className="mt-12 space-y-8 text-[#A0A0A0]">
          {/* Notice Banner */}
          <div className="rounded-lg bg-[#FFD23F]/10 border border-[#FFD23F]/30 p-4">
            <p className="text-[#FFD23F] font-medium mb-2">Placeholder Notice</p>
            <p className="text-sm">
              This is a placeholder privacy policy. A comprehensive legal document will be added before the official launch.
              For now, this page exists to prevent 404 errors.
            </p>
          </div>

          {/* Sections */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h3>
            <p className="leading-relaxed">
              StoryForge collects information necessary to provide our Instagram Story monitoring services. This includes
              your Instagram account credentials (stored securely), monitored story data, and usage analytics.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">2. How We Use Your Data</h3>
            <p className="leading-relaxed">
              We use your data to monitor Instagram Stories according to your preferences, generate AI-powered content
              suggestions, and improve our service quality.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">3. Data Storage & Security</h3>
            <p className="leading-relaxed">
              Your data is stored securely on European servers (EU-based hosting). We implement industry-standard
              encryption and security measures to protect your information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">4. Data Retention</h3>
            <p className="leading-relaxed">
              Story data is retained according to your subscription plan. Account data is retained until you delete your
              account.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">5. Your Rights</h3>
            <p className="leading-relaxed">
              Under GDPR, you have the right to access, rectify, erase, restrict processing, data portability, and object to
              processing. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">6. Contact</h3>
            <p className="leading-relaxed">
              For privacy-related inquiries, please contact us at{' '}
              <a href="mailto:privacy@storyforge.cloud" className="text-[#FFD23F] hover:underline">
                privacy@storyforge.cloud
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Last updated: January 2026 | This policy will be updated before official launch.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
