import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Globe, Play, Pause, BookmarkPlus, Volume2, CheckCircle2, ArrowLeft } from "lucide-react";
import { mockLessons } from "@/lib/mockData";
import { toast } from "sonner";

export default function LessonPlayer() {
  const { lessonId } = useParams();
  const lesson = mockLessons.find(l => l.id === lessonId);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isPlaying, setIsPlaying] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-lg text-muted-foreground">Lesson not found</p>
          <Link to="/lessons" className="mt-4 inline-block">
            <Button>Back to Lessons</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSavePhrase = (text: string) => {
    toast.success(`"${text}" saved to vocabulary!`);
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const checkAnswers = () => {
    const correct = lesson.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const total = lesson.questions.length;
    
    if (correct === total) {
      toast.success(`Perfect! ${correct}/${total} correct answers! 🎉`);
    } else {
      toast.info(`You got ${correct}/${total} correct. Review the explanations to learn more.`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/lessons" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Lessons</span>
            </Link>
            
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold hidden sm:inline">BizTalk</span>
            </Link>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <Card className="p-6 shadow-card mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-primary/10 text-primary">{lesson.level}</Badge>
                  <Badge variant="outline">{lesson.topic}</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Progress value={lesson.progress} className="flex-1" />
              <span className="text-sm font-medium">{lesson.progress}%</span>
            </div>
          </Card>

          {/* Audio Player (if audio lesson) */}
          {lesson.format === 'audio' && (
            <Card className="p-6 shadow-card mb-6">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="shrink-0 rounded-full w-14 h-14"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Audio Lesson</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-1/3 transition-all" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Lesson Content */}
          <Card className="p-8 shadow-card mb-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {lesson.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph.split(' ').map((word, wordIdx) => {
                    const cleanWord = word.replace(/[.,!?;:]/g, '');
                    const isComplexWord = cleanWord.length > 8;
                    
                    return (
                      <span key={wordIdx}>
                        {isComplexWord ? (
                          <span
                            className="cursor-pointer hover:bg-primary/10 rounded px-1 transition-colors"
                            onClick={() => handleSavePhrase(cleanWord)}
                            title="Click to save to vocabulary"
                          >
                            {word}
                          </span>
                        ) : (
                          word
                        )}{' '}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => handleSavePhrase("example phrase")}>
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Save to Vocabulary
              </Button>
            </div>
          </Card>

          {/* Quiz Section */}
          {!showQuiz ? (
            <Card className="p-8 shadow-card text-center">
              <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Ready to test your understanding?</h3>
              <p className="text-muted-foreground mb-6">
                Answer {lesson.questions.length} questions to reinforce what you've learned.
              </p>
              <Button size="lg" onClick={() => setShowQuiz(true)}>
                Start Quiz
              </Button>
            </Card>
          ) : (
            <Card className="p-8 shadow-card">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Comprehension Check</h3>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {lesson.questions.length}
                  </span>
                </div>
                <Progress 
                  value={((currentQuestion + 1) / lesson.questions.length) * 100} 
                  className="h-2"
                />
              </div>

              {lesson.questions.map((question, idx) => (
                idx === currentQuestion && (
                  <div key={question.id}>
                    <p className="text-lg font-medium mb-6">{question.question}</p>
                    
                    <RadioGroup
                      value={answers[question.id]}
                      onValueChange={(value) => handleAnswer(question.id, value)}
                    >
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-3 mb-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label 
                            htmlFor={`${question.id}-${option}`} 
                            className="flex-1 cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {answers[question.id] && (
                      <div className={`mt-6 p-4 rounded-lg ${
                        answers[question.id] === question.correctAnswer 
                          ? 'bg-success/10 border border-success/20' 
                          : 'bg-warning/10 border border-warning/20'
                      }`}>
                        <p className="font-medium mb-2">
                          {answers[question.id] === question.correctAnswer 
                            ? '✓ Correct!' 
                            : '✗ Incorrect'}
                        </p>
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    )}

                    <div className="flex gap-4 mt-8">
                      {currentQuestion > 0 && (
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        >
                          Previous
                        </Button>
                      )}
                      
                      {currentQuestion < lesson.questions.length - 1 ? (
                        <Button 
                          onClick={() => setCurrentQuestion(currentQuestion + 1)}
                          disabled={!answers[question.id]}
                          className="flex-1"
                        >
                          Next Question
                        </Button>
                      ) : (
                        <Button 
                          onClick={checkAnswers}
                          disabled={!answers[question.id]}
                          className="flex-1"
                        >
                          Complete Lesson
                        </Button>
                      )}
                    </div>
                  </div>
                )
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
