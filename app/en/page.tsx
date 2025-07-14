<parameter name="filePath">app/en/page.tsx</parameter>
<parameter name="contentType">content</parameter>
<parameter name="content">import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PopularRoutes } from '@/components/popular-routes';
import { QuickSearch } from '@/components/quick-search';
import { WhyChooseUs } from '@/components/why-choose-us';
import { RecentRides } from '@/components/recent-rides';
import { CommunityStats } from '@/components/community-stats';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <QuickSearch />
        <PopularRoutes />
        <WhyChooseUs />
        <RecentRides />
        <CommunityStats />
      </main>
      <Footer />
    </div>
  );
}</parameter>
</parameter>