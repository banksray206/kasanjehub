
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ProfileSection from '@/components/sections/profile-section';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}
