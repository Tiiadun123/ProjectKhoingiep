import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mic, BookOpen, CheckCircle2 } from "lucide-react";

const grammarQuestions = [
  {
    id: 'g1',
    question: 'She _____ to Paris three times this year.',
    options: ['goes', 'has gone', 'went', 'is going'],
    correct: 'has gone',
  },
  {
    id: 'g2',
    question: 'If I _____ more time, I would travel around the world.',
    options: ['have', 'had', 'will have', 'would have'],
    correct: 'had',
  },
  {
    id: 'g3',
    question: 'The project _____ by the team before the deadline.',
    options: ['completed', 'was completed', 'has completed', 'is completing'],
    correct: 'was completed',
  },
];

const readingPassage = `
Artificial intelligence is rapidly transforming industries across the globe. From healthcare to finance, 
AI systems are being deployed to analyze vast amounts of data, identify patterns, and make predictions 
with unprecedented accuracy. However, this technological revolution also raises important ethical questions. 
How do we ensure AI systems are fair and unbiased? What happens to jobs that become automated? As we embrace 
these powerful tools, we must also develop frameworks for responsible AI governance that protect human rights 
and promote social welfare.
`;

const readingQuestions = [
  {
    id: 'r1',
    question: 'According to the passage, AI is being used to:',
    options: [
      'Replace all human workers',
      'Analyze data and make predictions',
      'Eliminate ethical concerns',
      'Slow down technological progress',
    ],
    correct: 'Analyze data and make predictions',
  },
  {
    id: 'r2',
    question: 'The passage suggests that AI development should:',
    options: [
      'Proceed without any restrictions',
      'Be completely stopped',
      'Include ethical governance frameworks',
      'Focus only on profit',
    ],
    correct: 'Include ethical governance frameworks',
  },
];

export default function PlacementTest() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'intro' | 'grammar' | 'reading' | 'speaking' | 'results'>('intro');
  const [grammarAnswers, setGrammarAnswers] = useState<Record<string, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  
  const totalSteps = 4;
  const currentStepNumber = step === 'intro' ? 0 : step === 'grammar' ? 1 : step === 'reading' ? 2 : step === 'speaking' ? 3 : 4;
  const progress = (currentStepNumber / totalSteps) * 100;

  const calculateScore = () => {
    let grammarScore = 0;
    grammarQuestions.forEach(q => {
      if (grammarAnswers[q.id] === q.correct) grammarScore++;
    });
    
    let readingScore = 0;
    readingQuestions.forEach(q => {
      if (readingAnswers[q.id] === q.correct) readingScore++;
    });
    
    const grammarPercent = (grammarScore / grammarQuestions.length) * 100;
    const readingPercent = (readingScore / readingQuestions.length) * 100;
    const speakingPercent = 75; // Mock score
    
    const average = (grammarPercent + readingPercent + speakingPercent) / 3;
    
    let level = 'A1';
    if (average >= 90) level = 'C2';
    else if (average >= 80) level = 'C1';
    else if (average >= 70) level = 'B2';
    else if (average >= 60) level = 'B1';
    else if (average >= 50) level = 'A2';
    
    return { grammarPercent, readingPercent, speakingPercent, level };
  };

  const handleNext = () => {
    if (step === 'intro') setStep('grammar');
    else if (step === 'grammar') setStep('reading');
    else if (step === 'reading') setStep('speaking');
    else if (step === 'speaking') setStep('results');
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording for 3 seconds
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="p-8 shadow-lg-custom">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">English Placement Test</h1>
              <p className="text-lg text-muted-foreground">
                This comprehensive assessment will evaluate your English proficiency across multiple dimensions.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Grammar & Vocabulary</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple-choice questions testing your grammar knowledge and vocabulary range.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Reading Comprehension</h3>
                  <p className="text-sm text-muted-foreground">
                    Read a passage and answer questions to demonstrate your understanding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <Mic className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Speaking Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Record a short response to evaluate your pronunciation and fluency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-8">
              <p className="text-sm">
                <strong>Time:</strong> Approximately 15-20 minutes<br />
                <strong>Result:</strong> Immediate level assessment (A1-C2) and personalized learning path
              </p>
            </div>

            <Button onClick={handleNext} size="lg" className="w-full">
              Begin Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    const scores = calculateScore();
    
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 shadow-lg-custom">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Test Complete!</h1>
              <p className="text-lg text-muted-foreground">
                Your English proficiency level: <span className="text-primary font-bold text-2xl">{scores.level}</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Grammar</h3>
                <p className="text-3xl font-bold text-primary">{Math.round(scores.grammarPercent)}%</p>
              </Card>
              
              <Card className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Reading</h3>
                <p className="text-3xl font-bold text-accent">{Math.round(scores.readingPercent)}%</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Mic className="h-8 w-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Speaking</h3>
                <p className="text-3xl font-bold text-success">{Math.round(scores.speakingPercent)}%</p>
              </Card>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-3">Recommended Learning Path</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your {scores.level} level, we recommend starting with intermediate business English and 
                academic vocabulary courses. Focus on expanding your range of expressions and mastering complex grammatical structures.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Business English
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  Academic Writing
                </span>
                <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                  Pronunciation Practice
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => navigate('/dashboard')} size="lg" className="flex-1">
                Go to Dashboard
              </Button>
              <Button onClick={() => navigate('/lessons')} variant="outline" size="lg" className="flex-1">
                Browse Lessons
              </Button>
            </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStepNumber} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-lg-custom">
          {step === 'grammar' && (
            <>
              <h2 className="text-2xl font-bold mb-6">Grammar & Vocabulary</h2>
              <div className="space-y-8">
                {grammarQuestions.map((q, idx) => (
                  <div key={q.id}>
                    <p className="font-medium mb-4">{idx + 1}. {q.question}</p>
                    <RadioGroup
                      value={grammarAnswers[q.id]}
                      onValueChange={(value) => setGrammarAnswers({ ...grammarAnswers, [q.id]: value })}
                    >
                      {q.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                          <Label htmlFor={`${q.id}-${option}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
              <Button onClick={handleNext} className="w-full mt-8" disabled={Object.keys(grammarAnswers).length < grammarQuestions.length}>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}

          {step === 'reading' && (
            <>
              <h2 className="text-2xl font-bold mb-6">Reading Comprehension</h2>
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <p className="leading-relaxed">{readingPassage}</p>
              </div>
              <div className="space-y-8">
                {readingQuestions.map((q, idx) => (
                  <div key={q.id}>
                    <p className="font-medium mb-4">{idx + 1}. {q.question}</p>
                    <RadioGroup
                      value={readingAnswers[q.id]}
                      onValueChange={(value) => setReadingAnswers({ ...readingAnswers, [q.id]: value })}
                    >
                      {q.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                          <Label htmlFor={`${q.id}-${option}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
              <Button onClick={handleNext} className="w-full mt-8" disabled={Object.keys(readingAnswers).length < readingQuestions.length}>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}

          {step === 'speaking' && (
            <>
              <h2 className="text-2xl font-bold mb-6">Speaking Assessment</h2>
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <p className="font-medium mb-4">Please record your response to the following prompt:</p>
                <p className="text-lg italic">
                  "Describe your favorite place to visit and explain why you enjoy going there. 
                  Try to speak for 30-60 seconds."
                </p>
              </div>

              <div className="flex flex-col items-center justify-center py-12">
                <div className={`w-32 h-32 rounded-full ${isRecording ? 'bg-destructive animate-pulse' : 'bg-primary'} 
                  flex items-center justify-center mb-6 transition-all cursor-pointer`}
                  onClick={handleRecord}
                >
                  <Mic className="h-16 w-16 text-primary-foreground" />
                </div>
                <p className="text-center font-medium mb-2">
                  {isRecording ? 'Recording...' : 'Click to start recording'}
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  {isRecording ? 'Speak clearly into your microphone' : 'Make sure your microphone is enabled'}
                </p>
              </div>

              <Button onClick={handleNext} className="w-full" disabled={isRecording}>
                Complete Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
