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
          subtitle="Please read these Terms of Service carefully before using StoryForge. By accessing or using our service, you agree to be bound by these terms."
          size="lg"
          align="left"
          maxWidth="none"
        />

        <div className="mt-12 space-y-10 text-[#A0A0A0]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing or using StoryForge (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). 
              If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="leading-relaxed mt-3">
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="leading-relaxed mb-4">
              StoryForge provides the following services:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Instagram Story monitoring for specified accounts</li>
              <li>Automatic story downloading and archiving</li>
              <li>AI-powered content suggestions based on monitored stories</li>
              <li>Dashboard for managing monitored accounts and viewing content</li>
              <li>API access for programmatic integration (depending on subscription plan)</li>
            </ul>
            <p className="leading-relaxed mt-4">
              The Service requires you to provide valid Instagram session credentials to access Instagram&apos;s content on your behalf.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration</h2>
            <p className="leading-relaxed mb-4">
              To use StoryForge, you must:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Be at least 16 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Instagram Credentials and Compliance</h2>
            <div className="bg-[#111] rounded-lg p-4 border border-[#FFD23F]/30 mb-4">
              <p className="text-[#FFD23F] font-medium mb-2">Important Notice</p>
              <p className="text-sm">
                By using StoryForge, you acknowledge that you are providing your Instagram session credentials at your own risk. 
                You are responsible for ensuring your use of StoryForge complies with Instagram&apos;s Terms of Use.
              </p>
            </div>
            <p className="leading-relaxed mb-4">
              You represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>You are the authorized owner of the Instagram account credentials you provide</li>
              <li>You will only monitor accounts for which you have legitimate business purposes</li>
              <li>You will not use the Service to harass, stalk, or violate the privacy of others</li>
              <li>You understand that Instagram may take action against accounts used with third-party services</li>
              <li>You accept full responsibility for any consequences arising from your use of the Service with Instagram</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Acceptable Use</h2>
            <p className="leading-relaxed mb-4">
              You agree NOT to use StoryForge to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Harass, abuse, or harm another person or entity</li>
              <li>Collect or store personal data about others without their consent</li>
              <li>Distribute spam, malware, or other harmful content</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Resell, sublicense, or redistribute the Service without authorization</li>
              <li>Use automated systems or software to extract data from the Service (except via our API)</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Subscription and Payment</h2>
            
            <h3 className="text-lg font-medium text-white mb-3 mt-6">6.1 Subscription Plans</h3>
            <p className="leading-relaxed">
              StoryForge offers both free and paid subscription plans. Features, limitations, and pricing are described 
              on our website and may be updated from time to time.
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">6.2 Billing</h3>
            <p className="leading-relaxed">
              Paid subscriptions are billed in advance on a recurring basis (monthly or annually, depending on your selected plan). 
              By subscribing, you authorize us to charge your payment method automatically.
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">6.3 Price Changes</h3>
            <p className="leading-relaxed">
              We reserve the right to modify pricing at any time. Price changes will be communicated at least 30 days in advance 
              and will take effect at the start of your next billing cycle.
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">6.4 Refunds</h3>
            <p className="leading-relaxed">
              Subscription fees are generally non-refundable. However, you may be entitled to a refund under applicable 
              consumer protection laws. For refund requests, contact us at{' '}
              <a href="mailto:support@storyforge.cloud" className="text-[#FFD23F] hover:underline">
                support@storyforge.cloud
              </a>.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cancellation and Termination</h2>
            
            <h3 className="text-lg font-medium text-white mb-3 mt-6">7.1 Cancellation by You</h3>
            <p className="leading-relaxed">
              You may cancel your subscription at any time through your account settings. Cancellation takes effect at 
              the end of your current billing period. You will retain access to paid features until then.
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">7.2 Termination by Us</h3>
            <p className="leading-relaxed">
              We may suspend or terminate your account immediately if you:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Violate these Terms of Service</li>
              <li>Engage in fraudulent or illegal activity</li>
              <li>Fail to pay applicable fees</li>
              <li>Create risk or legal exposure for StoryForge</li>
            </ul>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">7.3 Effect of Termination</h3>
            <p className="leading-relaxed">
              Upon termination, your right to use the Service ceases immediately. We may delete your account data 
              in accordance with our Privacy Policy. You may request a copy of your data before termination.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
            
            <h3 className="text-lg font-medium text-white mb-3 mt-6">8.1 Our Property</h3>
            <p className="leading-relaxed">
              The Service, including its original content, features, and functionality, is owned by StoryForge and is 
              protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">8.2 Your Content</h3>
            <p className="leading-relaxed">
              You retain ownership of any content you upload or create using the Service. By using our Service, you grant 
              us a limited license to store, process, and display your content as necessary to provide the Service.
            </p>

            <h3 className="text-lg font-medium text-white mb-3 mt-6">8.3 Third-Party Content</h3>
            <p className="leading-relaxed">
              Instagram stories and other content monitored through the Service are owned by their respective creators. 
              You are responsible for ensuring your use of such content complies with applicable laws and third-party rights.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Service Availability</h2>
            <p className="leading-relaxed mb-4">
              We strive to maintain high availability but cannot guarantee uninterrupted access to the Service. 
              The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Scheduled maintenance (we will provide advance notice when possible)</li>
              <li>Technical issues or system failures</li>
              <li>Changes to Instagram&apos;s platform, API, or policies</li>
              <li>Rate limiting imposed by Instagram</li>
              <li>Events beyond our reasonable control (force majeure)</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We are not liable for any loss or damage arising from service interruptions.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Disclaimer of Warranties</h2>
            <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
              <p className="leading-relaxed">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
                FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>
              <p className="leading-relaxed mt-3">
                We do not warrant that the Service will meet your requirements, be available without interruption, 
                be secure, or be error-free. We do not guarantee any specific results from your use of the Service.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Limitation of Liability</h2>
            <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, STORYFORGE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or content</li>
                <li>Suspension or termination of your Instagram account</li>
                <li>Unauthorized access to your data</li>
                <li>Any damages arising from your use or inability to use the Service</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Our total liability for any claims arising from or related to the Service shall not exceed the 
                amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless StoryForge and its officers, directors, employees, 
              and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your violation of any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law and Dispute Resolution</h2>
            <p className="leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the European Union 
              and applicable member state laws, without regard to conflict of law principles.
            </p>
            <p className="leading-relaxed">
              Any disputes arising from these Terms or your use of the Service shall be resolved through:
            </p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li><strong className="text-white">Informal negotiation:</strong> Contact us first to resolve the issue</li>
              <li><strong className="text-white">Mediation:</strong> If negotiation fails, through a mutually agreed mediator</li>
              <li><strong className="text-white">Legal proceedings:</strong> In the competent courts, if mediation fails</li>
            </ol>
            <p className="leading-relaxed mt-4">
              If you are a consumer in the EU, you may also use the EU Online Dispute Resolution platform at{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FFD23F] hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Consumer Rights</h2>
            <p className="leading-relaxed mb-4">
              If you are a consumer in the European Union, you have certain rights under EU consumer protection laws 
              that cannot be waived by these Terms, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Right of withdrawal:</strong> You may cancel your subscription within 14 days 
              of purchase without giving a reason, unless you have already accessed digital content</li>
              <li><strong className="text-white">Conformity guarantee:</strong> The Service must conform to its description 
              and be fit for purpose</li>
              <li><strong className="text-white">Unfair terms protection:</strong> Unfair contract terms are not binding on consumers</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes 
              by email or through the Service at least 30 days before they take effect.
            </p>
            <p className="leading-relaxed mt-3">
              Your continued use of the Service after changes become effective constitutes acceptance of the new Terms. 
              If you do not agree to the modified Terms, you must stop using the Service and cancel your subscription.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">16. Severability</h2>
            <p className="leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
              limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">17. Entire Agreement</h2>
            <p className="leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and StoryForge 
              regarding the Service and supersede all prior agreements and understandings.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">18. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-3">
              <a href="mailto:support@storyforge.cloud" className="text-[#FFD23F] hover:underline text-lg">
                support@storyforge.cloud
              </a>
            </p>
          </section>

          {/* Footer */}
          <section className="pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Last updated: January 2026
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
