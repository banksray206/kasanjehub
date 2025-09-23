
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MarketplaceSection from '@/components/sections/marketplace-section';

export default function MarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MarketplaceSection />
      </main>
      <Footer />
    </div>
  );
}
