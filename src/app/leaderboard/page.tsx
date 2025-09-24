import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import LeaderboardSection from '@/components/sections/leaderboard-section';
import { fetchLeaderboard } from './actions';

export default async function LeaderboardPage() {
  const leaderboard = await fetchLeaderboard();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <LeaderboardSection leaderboard={leaderboard} />
      </main>
      <Footer />
    </div>
  );
}
