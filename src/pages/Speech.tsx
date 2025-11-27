import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProBadge } from "@/components/ProBadge";
import { Link } from "react-router-dom";
import { Globe, Mic, Play, Volume2, TrendingUp, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Speech() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        setHasRecording(true);
        setShowFeedback(true);
      }, 3000);
    }
  };

  const mockFeedback = {
    overallScore: 78,
    pronunciation: 82,
    intonation: 75,
    fluency: 76,
    errors: [
      { phoneme: 'θ', word: 'think', position: '0:12', correction: 'Try positioning your tongue between your teeth' },
      { phoneme: 'r', word: 'river', position: '0:24', correction: 'Curl your tongue back slightly' },
    ],
    strengths: ['Clear articulation', 'Good pace', 'Natural stress patterns'],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">BizTalk</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/lessons" className="text-sm font-medium hover:text-primary transition-colors">Lessons</Link>
              <Link to="/vocabulary" className="text-sm font-medium hover:text-primary transition-colors">Vocabulary</Link>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">Speech Correction</h1>
              <ProBadge />
            </div>
            <p className="text-muted-foreground">
              Get real-time feedback on pronunciation, intonation, and fluency
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recording Section */}
            <div className="space-y-6">
              <Card className="p-8 shadow-card">
                <h3 className="font-semibold mb-4">Practice Prompt</h3>
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-lg italic">
                    "I think the weather will be pleasant tomorrow. We should go for a walk by the river."
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-12 h-12 rounded-full"
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Listen to native speaker
                  </span>
                </div>

                {/* Waveform Visualization */}
                <div className="bg-muted/30 rounded-lg p-6 mb-6">
                  <div className="flex items-end justify-center gap-1 h-24">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          isRecording 
                            ? 'bg-destructive animate-pulse' 
                            : hasRecording 
                            ? 'bg-accent' 
                            : 'bg-muted-foreground/30'
                        }`}
                        style={{
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1 h-14"
                    onClick={handleRecord}
                    disabled={isRecording}
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    {isRecording ? 'Recording...' : hasRecording ? 'Record Again' : 'Start Recording'}
                  </Button>
                  
                  {hasRecording && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Play
                    </Button>
                  )}
                </div>
              </Card>

              {/* Quick Tips */}
              <Card className="p-6 shadow-card">
                <h3 className="font-semibold mb-4">Recording Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Speak clearly at a natural pace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Use a quiet environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Position microphone 6-12 inches away</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Feedback Section */}
            <div className="space-y-6">
              {showFeedback ? (
                <>
                  {/* Overall Score */}
                  <Card className="p-6 shadow-card">
                    <h3 className="font-semibold mb-4">Overall Score</h3>
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {mockFeedback.overallScore}
                      </div>
                      <p className="text-sm text-muted-foreground">Good job! Keep practicing</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Pronunciation</span>
                          <span className="text-sm text-muted-foreground">{mockFeedback.pronunciation}%</span>
                        </div>
                        <Progress value={mockFeedback.pronunciation} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Intonation</span>
                          <span className="text-sm text-muted-foreground">{mockFeedback.intonation}%</span>
                        </div>
                        <Progress value={mockFeedback.intonation} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Fluency</span>
                          <span className="text-sm text-muted-foreground">{mockFeedback.fluency}%</span>
                        </div>
                        <Progress value={mockFeedback.fluency} />
                      </div>
                    </div>
                  </Card>

                  {/* Detailed Feedback */}
                  <Card className="p-6 shadow-card">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-warning" />
                      Areas to Improve
                    </h3>
                    <div className="space-y-4">
                      {mockFeedback.errors.map((error, idx) => (
                        <div key={idx} className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-mono text-sm font-medium">/{error.phoneme}/</span>
                            <Badge variant="outline" className="text-xs">{error.position}</Badge>
                          </div>
                          <p className="text-sm mb-1">
                            in "<span className="font-semibold">{error.word}</span>"
                          </p>
                          <p className="text-xs text-muted-foreground">{error.correction}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Strengths */}
                  <Card className="p-6 shadow-card">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      What You Did Well
                    </h3>
                    <ul className="space-y-2">
                      {mockFeedback.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <span className="text-success">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Practice Drills */}
                  <Card className="p-6 shadow-card">
                    <h3 className="font-semibold mb-4">Focused Practice</h3>
                    <Button className="w-full" variant="outline">
                      Start Phoneme Drill: /θ/
                    </Button>
                  </Card>
                </>
              ) : (
                <Card className="p-12 shadow-card text-center">
                  <Mic className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Ready to Practice?</h3>
                  <p className="text-muted-foreground">
                    Record yourself reading the prompt to get instant feedback on your pronunciation
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
