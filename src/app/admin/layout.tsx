
'use client';

import { useAuth } from '@/hooks/use-auth';
import AdminDashboard from '@/components/sections/admin-dashboard';
import AdminLogin from '@/components/sections/admin-login';

export default function AdminLayout() {
  const { user, loading } = useAuth();
  const adminEmails = ['kawooyaraymond40@gmail.com', 'banksray206@gmail.com'];
  const isAdmin = user && user.email && adminEmails.includes(user.email);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
