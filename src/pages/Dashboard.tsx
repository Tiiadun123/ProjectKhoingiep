import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProBadge } from "@/components/ProBadge";
import { Navigation } from "@/components/Navigation"; // Sử dụng Navigation chuẩn
import { Link } from "react-router-dom";
import { BookOpen, Mic, Trophy, TrendingUp, Target } from "lucide-react";
import { mockUser, mockProgress, mockLeaderboard, mockBadges } from "@/lib/mockData";

export default function Dashboard() {
  const weekProgress = (mockProgress.completedThisWeek / mockProgress.weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation /> {/* Menu tự động cập nhật tiếng Anh từ file Navigation.tsx */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}! 👋</h1>
          <p className="text-muted-foreground">
            You're currently at <span className="font-semibold text-primary">{mockUser.level}</span> level
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Goal */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-success" />
              <h3 className="font-semibold">Weekly Goal</h3>
            </div>
            <p className="text-2xl font-bold mb-3">
              {mockProgress.completedThisWeek} / {mockProgress.weeklyGoal} Lessons
            </p>
            <Progress value={weekProgress} className="h-2" />
          </Card>

          {/* Level Progress */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Level Progress</h3>
            </div>
            <p className="text-2xl font-bold mb-3">B2 → C1</p>
            <Progress value={65} className="h-2" />
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Radar */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-bold mb-6">Your Skills</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Listening</span>
                    <span className="text-sm text-muted-foreground">{mockProgress.listening}%</span>
                  </div>
                  <Progress value={mockProgress.listening} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Speaking</span>
                    <span className="text-sm text-muted-foreground">{mockProgress.speaking}%</span>
                  </div>
                  <Progress value={mockProgress.speaking} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Reading</span>
                    <span className="text-sm text-muted-foreground">{mockProgress.reading}%</span>
                  </div>
                  <Progress value={mockProgress.reading} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Writing</span>
                    <span className="text-sm text-muted-foreground">{mockProgress.writing}%</span>
                  </div>
                  <Progress value={mockProgress.writing} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-bold mb-6">Continue Learning</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/lessons" className="block">
                  <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                    <BookOpen className="h-8 w-8" />
                    <span className="font-semibold">Lessons</span>
                  </Button>
                </Link>
                
                <Link to="/vocabulary" className="block">
                  <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                    <BookOpen className="h-8 w-8" />
                    <span className="font-semibold">Vocabulary</span>
                  </Button>
                </Link>
                
                <Link to="/speech" className="block">
                  <Card className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full">
                    <div className="absolute top-2 right-2">
                      <ProBadge />
                    </div>
                    <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                      <Mic className="h-8 w-8" />
                      <span className="font-semibold">Speech</span>
                    </Button>
                  </Card>
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-warning" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-lg text-center ${
                      badge.earned ? 'bg-primary/10' : 'bg-muted/50 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <p className="text-xs font-medium">{badge.name}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Leaderboard</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {mockLeaderboard.slice(0, 5).map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      entry.name === mockUser.name ? 'bg-primary/10' : ''
                    }`}
                  >
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      {entry.rank}
                    </span>
                    <span className="text-2xl">{entry.avatar}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.score} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upgrade Prompt */}
            {!mockUser.isPro && (
              <Card className="p-6 shadow-lg gradient-card border-primary/20">
                <ProBadge className="mb-4" />
                <h3 className="font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock advanced speech correction, unlimited lessons, and personalized content.
                </p>
                <Button className="w-full">Upgrade Now</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}