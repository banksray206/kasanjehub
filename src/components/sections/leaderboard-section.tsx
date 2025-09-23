
'use client';

import { useState } from 'react';
import { ContentWrapper } from '@/components/content-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const allTimeUsers = [
  { rank: 1, name: 'KAWOOYA RAYMOND', points: '12,500', status: 'Top Contributor', avatarId: 'avatar-1' },
  { rank: 2, name: 'Nalwoga Sarah', points: '11,800', status: 'Top Contributor', avatarId: 'avatar-2' },
  { rank: 3, name: 'Ssebugwawo Peter', points: '10,200', status: 'Top Contributor', avatarId: 'avatar-3' },
  { rank: 4, name: 'Jane Doe', points: '9,500', status: 'Active', avatarId: 'avatar-4' },
  { rank: 5, name: 'John Smith', points: '8,750', status: 'Active', avatarId: 'avatar-5' },
  { rank: 6, name: 'Emily White', points: '8,200', status: 'Active', avatarId: 'avatar-6' },
  { rank: 7, name: 'Kato James', points: '7,900', status: 'New', avatarId: 'avatar-7' },
  { rank: 8, name: 'Babirye Grace', points: '7,100', status: 'New', avatarId: 'avatar-8' },
];

const monthlyUsers = [
  { rank: 1, name: 'Nalwoga Sarah', points: '3,500', status: 'Top Contributor', avatarId: 'avatar-2' },
  { rank: 2, name: 'KAWOOYA RAYMOND', points: '3,200', status: 'Top Contributor', avatarId: 'avatar-1' },
  { rank: 3, name: 'Jane Doe', points: '2,800', status: 'Active', avatarId: 'avatar-4' },
  { rank: 4, name: 'Ssebugwawo Peter', points: '2,500', status: 'Top Contributor', avatarId: 'avatar-3' },
  { rank: 5, name: 'John Smith', points: '2,100', status: 'Active', avatarId: 'avatar-5' },
];

const weeklyUsers = [
  { rank: 1, name: 'Jane Doe', points: '900', status: 'Active', avatarId: 'avatar-4' },
  { rank: 2, name: 'Nalwoga Sarah', points: '850', status: 'Top Contributor', avatarId: 'avatar-2' },
  { rank: 3, name: 'Kato James', points: '700', status: 'New', avatarId: 'avatar-7' },
];

const LeaderboardTable = ({ users }: { users: typeof allTimeUsers }) => {
  const getRankIndicator = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Award className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-yellow-700" />;
    return <span className="font-bold text-lg">{rank}</span>;
  };

  const getRowClass = (rank: number) => {
    if (rank === 1) return 'bg-yellow-50 border-yellow-200';
    if (rank === 2) return 'bg-gray-50 border-gray-200';
    if (rank === 3) return 'bg-yellow-100/50 border-yellow-600/20';
    return '';
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] text-center">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const avatar = PlaceHolderImages.find(p => p.id === user.avatarId);
          return (
            <TableRow key={user.rank} className={getRowClass(user.rank)}>
              <TableCell className="text-center">{getRankIndicator(user.rank)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint="person portrait" />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'Top Contributor' ? 'default' : 'secondary'} className={user.status === 'Top Contributor' ? 'bg-green-600 text-white' : ''}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-bold text-primary">{user.points}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default function LeaderboardSection() {

  return (
    <ContentWrapper>
       <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Community Leaderboard</h2>
        <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">See who's making the biggest impact in our community. Earn points by posting, helping others, and more!</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Members</CardTitle>
          <CardDescription>Our most active and helpful community members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-time">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-4">
              <TabsTrigger value="all-time">All Time</TabsTrigger>
              <TabsTrigger value="this-month">This Month</TabsTrigger>
              <TabsTrigger value="this-week">This Week</TabsTrigger>
            </TabsList>
            <TabsContent value="all-time">
              <LeaderboardTable users={allTimeUsers} />
            </TabsContent>
            <TabsContent value="this-month">
              <LeaderboardTable users={monthlyUsers} />
            </TabsContent>
            <TabsContent value="this-week">
              <LeaderboardTable users={weeklyUsers} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
