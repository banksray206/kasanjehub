import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import NewfeedSection from '@/components/sections/newfeed-section';
import LeaderboardPreview from '@/components/sections/leaderboard-preview';
import { fetchPosts } from './actions';
import { fetchAdvertisements } from '../advertisements/actions';

export default async function NewfeedPage() {
  const posts = await fetchPosts();
  const ads = await fetchAdvertisements();
  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NewfeedSection initialPosts={posts} initialAds={ads} />
          </div>
          <div className="lg:col-span-1">
            <LeaderboardPreview />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
