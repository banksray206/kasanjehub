
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import LeaderboardSection from '@/components/sections/leaderboard-section';

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <LeaderboardSection />
      </main>
      <Footer />
    </div>
  );
}
