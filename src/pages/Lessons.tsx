import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation"; // Import Navigation
import { Link } from "react-router-dom";
import { Search, Clock, BookOpen, Headphones, Video } from "lucide-react";
import { mockLessons } from "@/lib/mockData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const levelColors = {
  A1: 'bg-green-500/10 text-green-600 dark:text-green-400',
  A2: 'bg-green-500/10 text-green-600 dark:text-green-400',
  B1: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  B2: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  C1: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  C2: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

const formatIcons = {
  reading: BookOpen,
  audio: Headphones,
  video: Video,
};

export default function Lessons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");

  const filteredLessons = mockLessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || lesson.level === levelFilter;
    const matchesTopic = topicFilter === "all" || lesson.topic === topicFilter;
    return matchesSearch && matchesLevel && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation /> {/* Sử dụng Navigation chuẩn */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Lesson Library</h1>
          <p className="text-muted-foreground">
            Explore lessons tailored to your level and interests
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 shadow-card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="A1">A1 - Beginner</SelectItem>
                <SelectItem value="A2">A2 - Elementary</SelectItem>
                <SelectItem value="B1">B1 - Intermediate</SelectItem>
                <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                <SelectItem value="C1">C1 - Advanced</SelectItem>
                <SelectItem value="C2">C2 - Proficient</SelectItem>
              </SelectContent>
            </Select>

            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Culture">Culture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const FormatIcon = formatIcons[lesson.format];
            
            return (
              <Card key={lesson.id} className="overflow-hidden shadow-card hover:shadow-lg-custom transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={levelColors[lesson.level]}>
                      {lesson.level}
                    </Badge>
                    <FormatIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.duration} min
                    </span>
                    <span>{lesson.topic}</span>
                  </div>
                  
                  {lesson.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{lesson.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${lesson.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Link to={`/lesson/${lesson.id}`}>
                    <Button className="w-full">
                      {lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredLessons.length === 0 && (
          <Card className="p-12 text-center shadow-card">
            <p className="text-muted-foreground">
              No lessons found matching your filters. Try adjusting your search criteria.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}