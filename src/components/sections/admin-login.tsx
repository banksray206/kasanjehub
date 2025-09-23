'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const adminEmails = ['kawooyaraymond40@gmail.com', 'banksray206@gmail.com'];
  const adminPassword = '220544';

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Manual admin check
    if (!adminEmails.includes(email) || password !== adminPassword) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid credentials for admin access.',
      });
      setLoading(false);
      return;
    }

    try {
      // Try to sign in with Supabase
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: error.message || 'Supabase authentication failed.',
        });
        setLoading(false);
        return;
      }

      toast({ title: 'Admin Login Successful' });
      router.push('/admin');
    } catch (error: any) {
      console.error('An error occurred during Supabase operation:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Enter'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
