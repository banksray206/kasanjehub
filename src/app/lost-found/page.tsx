
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import LostFoundSection from '@/components/sections/lost-found-section';

export default function LostFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <LostFoundSection />
      </main>
      <Footer />
    </div>
  );
}
