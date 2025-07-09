import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import { Testimonials } from '@/components/testimonials';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}