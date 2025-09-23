import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function LeaderboardPreview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Crown className="text-yellow-500" />
          Leaderboard
        </CardTitle>
        <Button variant="link" asChild>
          <Link href="/leaderboard">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground py-8">
        <div className="flex justify-center">
            <Crown className="w-16 h-16 text-muted-foreground/30 mb-4" />
        </div>
        <p>No active users yet</p>
      </CardContent>
    </Card>
  );
}
