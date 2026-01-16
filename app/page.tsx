import Hero from '@/components/Hero';
import EmailSignup from '@/components/EmailSignup';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <EmailSignup />
      <Footer />
    </main>
  );
}
