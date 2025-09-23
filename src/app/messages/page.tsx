
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MessagesSection from '@/components/sections/messages-section';

export default function MessagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <MessagesSection />
      </main>
      <Footer />
    </div>
  );
}
