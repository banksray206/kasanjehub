'use client';

import { Trophy, Award, Star, Medal, Crown } from 'lucide-react';
import { ContentWrapper } from '@/components/content-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const LeaderboardTable = ({ users }: { users: LeaderboardUser[] }) => {
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
	};

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
				{users.map((user, idx) => {
					const rank = idx + 1;
					const status = getStatus(user.interactions_score, rank, users.length);
					return (
						<TableRow key={user.full_name} className={getRowClass(rank)}>
							<TableCell className="text-center">{getRankIndicator(rank)}</TableCell>
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
									</Avatar>
									<span className="font-medium">{user.full_name}</span>
								</div>
							</TableCell>
							<TableCell>
								<Badge
									variant={status === 'Top Contributor' ? 'default' : 'secondary'}
									className={status === 'Top Contributor' ? 'bg-green-600 text-white' : ''}
								>
									{status}
								</Badge>
							</TableCell>
							<TableCell className="text-right font-bold text-primary">{user.interactions_score}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

type LeaderboardUser = {
	full_name: string;
	interactions_score: number;
	created_at: string;
	updated_at: string;
};

function getStatus(score: number, rank: number, total: number): string {
	if (rank === 1) return 'Top Contributor';
	if (rank === 2) return 'Top Contributor';
	if (rank === 3) return 'Top Contributor';
	if (score >= 50 && rank === total) return 'New';
	if (score >= 50) return 'Active';
	return 'Inactive';
}

function getRankIcon(rank: number) {
	if (rank === 1) return <Trophy className="text-yellow-500 w-6 h-6" />;
	if (rank === 2) return <Award className="text-gray-400 w-6 h-6" />;
	if (rank === 3) return <Star className="text-orange-400 w-6 h-6" />;
	return <span className="font-bold">{rank}</span>;
}

function isWithinDays(dateStr: string, days: number) {
	const date = new Date(dateStr);
	const now = new Date();
	const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
	return diff <= days;
}

export default function LeaderboardSection({ leaderboard }: { leaderboard: LeaderboardUser[] }) {
	const total = leaderboard.length;

	// Weekly: updated_at or created_at within last 7 days
	const weeklyUsers = leaderboard.filter(
		(user) => isWithinDays(user.updated_at ?? user.created_at, 7)
	);

	// Monthly: updated_at or created_at within last 30 days
	const monthlyUsers = leaderboard.filter(
		(user) => isWithinDays(user.updated_at ?? user.created_at, 30)
	);

	// All time: everyone
	const allTimeUsers = leaderboard;

	return (
		<ContentWrapper>
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Community Leaderboard</h2>
				<p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
					See who's making the biggest impact in our community. Earn points by posting, helping others, and more!
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Top Members</CardTitle>
					<CardDescription>Our most active and helpful community members.</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="all-time" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="all-time">All Time</TabsTrigger>
							<TabsTrigger value="monthly">Monthly</TabsTrigger>
							<TabsTrigger value="weekly">Weekly</TabsTrigger>
						</TabsList>
						<TabsContent value="all-time">
							<LeaderboardTable users={allTimeUsers} />
						</TabsContent>
						<TabsContent value="monthly">
							<LeaderboardTable users={monthlyUsers} />
						</TabsContent>
						<TabsContent value="weekly">
							<LeaderboardTable users={weeklyUsers} />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</ContentWrapper>
	);
}
