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
          subtitle="This Privacy Policy explains how StoryForge collects, uses, and protects your personal data in accordance with the EU General Data Protection Regulation (GDPR) and other applicable data protection laws."
          size="lg"
          align="left"
          maxWidth="none"
        />

        <div className="mt-12 space-y-10 text-[#A0A0A0]">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Data Controller</h2>
            <p className="leading-relaxed">
              StoryForge (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is the data controller responsible for processing your personal data.
            </p>
            <p className="leading-relaxed mt-3">
              <strong className="text-white">Contact:</strong>{' '}
              <a href="mailto:support@storyforge.cloud" className="text-[#FFD23F] hover:underline">
                support@storyforge.cloud
              </a>
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect and process the following categories of personal data:
            </p>
            
            <div className="space-y-4">
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-2">Account Data</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Email address (for account creation and communication)</li>
                  <li>Password (securely hashed using Argon2id algorithm)</li>
                  <li>Account preferences and settings</li>
                </ul>
              </div>

              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-2">Instagram Session Data</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Instagram session cookies you provide (sessionid, csrftoken, ds_user_id)</li>
                  <li>Instagram username and account identifiers</li>
                  <li>Target profile usernames for monitoring</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Note: All Instagram session data is encrypted at rest using AES-GCM encryption.
                </p>
              </div>

              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-2">Story Content Data</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Downloaded story media (images, videos) from monitored accounts</li>
                  <li>Story metadata (timestamps, captions, stickers)</li>
                  <li>AI-generated content suggestions based on monitored stories</li>
                </ul>
              </div>

              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-2">Technical Data</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Usage logs and access timestamps</li>
                </ul>
              </div>

              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-medium text-white mb-2">Payment Data</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Subscription status and plan information</li>
                  <li>Transaction history</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Note: Payment card details are processed directly by our payment provider and never stored on our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Purpose and Legal Basis</h2>
            <p className="leading-relaxed mb-4">
              We process your personal data for the following purposes and legal bases under GDPR Article 6:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-800 rounded-lg">
                <thead className="bg-[#111]">
                  <tr>
                    <th className="text-left p-3 text-white border-b border-gray-800">Purpose</th>
                    <th className="text-left p-3 text-white border-b border-gray-800">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Account creation and authentication</td>
                    <td className="p-3">Contract performance (Art. 6(1)(b))</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Story monitoring and content delivery</td>
                    <td className="p-3">Contract performance (Art. 6(1)(b))</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">AI content generation</td>
                    <td className="p-3">Contract performance (Art. 6(1)(b))</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Payment processing</td>
                    <td className="p-3">Contract performance (Art. 6(1)(b))</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Service improvement and analytics</td>
                    <td className="p-3">Legitimate interest (Art. 6(1)(f))</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Security and fraud prevention</td>
                    <td className="p-3">Legitimate interest (Art. 6(1)(f))</td>
                  </tr>
                  <tr>
                    <td className="p-3">Marketing communications</td>
                    <td className="p-3">Consent (Art. 6(1)(a))</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
            <p className="leading-relaxed mb-4">
              Your data is stored on servers located in the <strong className="text-white">European Union</strong>. We implement appropriate technical and organizational measures to protect your personal data, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>AES-GCM encryption for sensitive data at rest</li>
              <li>Argon2id password hashing</li>
              <li>TLS/HTTPS encryption for data in transit</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication mechanisms</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <p className="leading-relaxed mb-4">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Account data:</strong> Until you delete your account</li>
              <li><strong className="text-white">Instagram session data:</strong> Until you remove the session or delete your account</li>
              <li><strong className="text-white">Story content:</strong> According to your subscription plan retention period</li>
              <li><strong className="text-white">Technical logs:</strong> 90 days</li>
              <li><strong className="text-white">Payment records:</strong> As required by applicable tax and accounting laws (typically 7-10 years)</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Sharing</h2>
            <p className="leading-relaxed mb-4">
              We may share your personal data with the following categories of recipients:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Payment processors:</strong> To process subscription payments</li>
              <li><strong className="text-white">AI service providers:</strong> To generate content suggestions (data is anonymized where possible)</li>
              <li><strong className="text-white">Hosting providers:</strong> EU-based infrastructure providers</li>
              <li><strong className="text-white">Legal authorities:</strong> When required by law or to protect our legal rights</li>
            </ul>
            <p className="leading-relaxed mt-4">
              We do <strong className="text-white">not</strong> sell your personal data to third parties.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights (GDPR)</h2>
            <p className="leading-relaxed mb-4">
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="font-medium text-white mb-1">Right of Access</h3>
                <p className="text-sm">Request a copy of your personal data</p>
              </div>
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="font-medium text-white mb-1">Right to Rectification</h3>
                <p className="text-sm">Correct inaccurate or incomplete data</p>
              </div>
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="font-medium text-white mb-1">Right to Erasure</h3>
                <p className="text-sm">Request deletion of your data (&quot;right to be forgotten&quot;)</p>
              </div>
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="font-medium text-white mb-1">Right to Restrict Processing</h3>
                <p className="text-sm">Limit how we use your data</p>
              </div>
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="font-medium text-white mb-1">Right to Data Portability</h3>
                <p className="text-sm">Receive your data in a portable format</p>
              </div>
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
                <h3 className="font-medium text-white mb-1">Right to Object</h3>
                <p className="text-sm">Object to processing based on legitimate interest</p>
              </div>
              <div className="bg-[#111] rounded-lg p-4 border border-gray-800 md:col-span-2">
                <h3 className="font-medium text-white mb-1">Right to Withdraw Consent</h3>
                <p className="text-sm">Withdraw consent at any time where processing is based on consent</p>
              </div>
            </div>
            <p className="leading-relaxed mt-4">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@storyforge.cloud" className="text-[#FFD23F] hover:underline">
                support@storyforge.cloud
              </a>
              . We will respond within 30 days.
            </p>
            <p className="leading-relaxed mt-3">
              You also have the right to lodge a complaint with a supervisory authority if you believe your rights have been violated.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies</h2>
            <p className="leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Essential cookies:</strong> Required for authentication and security (no consent required)</li>
              <li><strong className="text-white">Functional cookies:</strong> Remember your preferences</li>
              <li><strong className="text-white">Analytics cookies:</strong> Understand how you use our service (consent required)</li>
            </ul>
            <p className="leading-relaxed mt-4">
              You can manage your cookie preferences through your browser settings or our cookie consent banner.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
            <p className="leading-relaxed">
              Your data is primarily stored and processed within the European Union. If we transfer data outside the EU/EEA, 
              we ensure adequate protection through Standard Contractual Clauses (SCCs) or other approved transfer mechanisms.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              StoryForge is not intended for users under 16 years of age. We do not knowingly collect personal data from children. 
              If you believe we have collected data from a child, please contact us immediately.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email 
              or through a notice on our website. The &quot;Last updated&quot; date at the bottom indicates when this policy was last revised.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
            <p className="leading-relaxed">
              For any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
