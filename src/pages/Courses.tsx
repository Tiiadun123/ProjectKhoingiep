import { useState } from "react";
import { Navigation } from "@/components/Navigation"; // Sử dụng navigation chuẩn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, CheckCircle2, Circle, Lock, PlayCircle, BarChart } from "lucide-react";
import { mockUser } from "@/lib/mockData";

// ... Interface definitions (giữ nguyên) ...
interface Module {
  id: string;
  title: string;
  topics: number;
  quizzes: number;
  progress: number;
  locked?: boolean;
}

interface Topic {
  id: string;
  title: string;
  subtitle: string;
  type: 'video' | 'practice' | 'quiz';
  duration?: string;
  completed: boolean;
  videoUrl?: string;
}

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<'toeic' | 'pronunciation'>('toeic');
  const [selectedModule, setSelectedModule] = useState<string>('module-1');

  // ... Data definitions (giữ nguyên data TOEIC/IPA) ...
  const toeicModules: Module[] = [
    { id: 'module-1', title: 'Listening - Part 1: Photos', topics: 5, quizzes: 3, progress: 60 },
    { id: 'module-2', title: 'Listening - Part 2: Q&A', topics: 3, quizzes: 3, progress: 0 },
    { id: 'module-3', title: 'Listening - Part 3: Conversations', topics: 2, quizzes: 2, progress: 0, locked: !mockUser.isPro },
    { id: 'module-4', title: 'Reading - Part 5: Grammar', topics: 4, quizzes: 3, progress: 0, locked: !mockUser.isPro },
    { id: 'module-5', title: 'Reading - Part 6: Text Completion', topics: 3, quizzes: 2, progress: 0, locked: !mockUser.isPro },
  ];

  const pronunciationModules: Module[] = [
    { id: 'ipa-1', title: 'Introduction to IPA', topics: 5, quizzes: 3, progress: 80 },
    { id: 'ipa-2', title: 'Vowel Sounds', topics: 8, quizzes: 4, progress: 45 },
    { id: 'ipa-3', title: 'Consonant Sounds', topics: 12, quizzes: 5, progress: 0 },
    { id: 'ipa-4', title: 'Stress & Intonation', topics: 6, quizzes: 3, progress: 0, locked: !mockUser.isPro },
  ];

  const toeicTopics: Topic[] = [
    { 
      id: 't-1-1', 
      title: 'I.1.1. Understanding Photo Descriptions', 
      subtitle: 'Learn to identify key elements in photos',
      type: 'video',
      duration: '15:30',
      completed: true,
      videoUrl: 'https://www.youtube.com/embed/InU21w0vAsk'
    },
    // ... keep other topics ...
  ];
  // (Lưu ý: Bạn giữ nguyên mảng data topics cũ)
  const ipaTopics: Topic[] = [
     { 
      id: 'ipa-1-1', 
      title: 'I.1.1. What is IPA?', 
      subtitle: 'Introduction to International Phonetic Alphabet',
      type: 'video',
      duration: '8:45',
      completed: true,
      videoUrl: 'https://www.youtube.com/embed/Ft17a7tyjMM&t'
    },
    // ... keep other topics ...
  ];

  const currentModules = selectedCourse === 'toeic' ? toeicModules : pronunciationModules;
  const currentTopics = selectedCourse === 'toeic' ? toeicTopics : ipaTopics;
  const currentModule = currentModules.find(m => m.id === selectedModule);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* New Unified Navigation */}
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Professional Courses</h1>
          <p className="text-muted-foreground">Industry-specific modules tailored to your career goals</p>
        </div>

        {/* Course Tabs */}
        <Tabs value={selectedCourse} onValueChange={(v) => setSelectedCourse(v as 'toeic' | 'pronunciation')} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="toeic">TOEIC Preparation</TabsTrigger>
            <TabsTrigger value="pronunciation">IPA Pronunciation</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {currentModules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => !module.locked && setSelectedModule(module.id)}
                      disabled={module.locked}
                      className={`w-full text-left p-4 border-l-4 transition-all ${
                        selectedModule === module.id
                          ? 'border-primary bg-primary/10'
                          : 'border-transparent hover:bg-muted/50'
                      } ${module.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {module.locked ? (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          ) : module.progress === 100 ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : module.progress > 0 ? (
                            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1 line-clamp-2">{module.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span>Topics: {module.topics}</span>
                            <span>•</span>
                            <span>Quizzes: {module.quizzes}</span>
                          </div>
                          {!module.locked && (
                            <Progress value={module.progress} className="h-1" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {currentModule?.locked ? (
              <Card className="p-12 text-center">
                <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Unlock Premium Modules</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to Pro to access advanced course content and exclusive features
                </p>
                <Button size="lg" className="gradient-pro">
                  Upgrade to Pro
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Module Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{currentModule?.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{currentModule?.topics} topics</span>
                          <span>•</span>
                          <span>{currentModule?.quizzes} quizzes</span>
                          <span>•</span>
                          <Badge variant="outline">{currentModule?.progress}% Complete</Badge>
                        </div>
                      </div>
                      <Progress value={currentModule?.progress || 0} className="w-32" />
                    </div>
                  </CardHeader>
                </Card>

                {/* Topics Grid (Same as before) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentTopics.map((topic) => (
                    <Card 
                      key={topic.id} 
                      className={`overflow-hidden transition-all hover:shadow-elegant cursor-pointer ${
                        topic.completed ? 'border-success/30' : ''
                      }`}
                    >
                      {topic.videoUrl ? (
                        <div className="aspect-video bg-muted relative group">
                          <iframe
                            src={topic.videoUrl}
                            title={topic.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative group">
                          {topic.type === 'video' && <PlayCircle className="w-16 h-16 text-primary opacity-80" />}
                          {topic.type === 'practice' && <FileText className="w-16 h-16 text-accent opacity-80" />}
                          {topic.type === 'quiz' && <BarChart className="w-16 h-16 text-warning opacity-80" />}
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1 text-success">{topic.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{topic.subtitle}</p>
                          </div>
                          {topic.completed && (
                            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="uppercase">{topic.type}</span>
                            {topic.duration && (
                              <>
                                <span>•</span>
                                <span>{topic.duration}</span>
                              </>
                            )}
                          </div>
                          <Button size="sm" variant={topic.completed ? "outline" : "default"}>
                            {topic.completed ? 'Review' : 'Start'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;