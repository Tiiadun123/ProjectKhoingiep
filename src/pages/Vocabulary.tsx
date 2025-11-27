import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigation } from "@/components/Navigation"; // Import Navigation
import { ArrowLeft, RotateCcw, CheckCircle2, XCircle, Eye } from "lucide-react";
import { mockVocabDecks } from "@/lib/mockData";
import { toast } from "sonner";

type ReviewMode = 'front' | 'back' | 'result';

export default function Vocabulary() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [reviewMode, setReviewMode] = useState<ReviewMode>('front');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [reviewedToday, setReviewedToday] = useState(0);

  const deck = selectedDeck ? mockVocabDecks.find(d => d.id === selectedDeck) : null;
  const currentCard = deck?.cards[currentCardIndex];

  const handleRate = (difficulty: 'easy' | 'medium' | 'hard') => {
    setReviewedToday(reviewedToday + 1);
    
    if (deck && currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setReviewMode('front');
    } else {
      toast.success(`Great work! You reviewed ${reviewedToday + 1} cards today! 🎉`);
      setSelectedDeck(null);
      setCurrentCardIndex(0);
      setReviewMode('front');
    }
  };

  if (!selectedDeck) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation /> {/* Đồng nhất Navigation */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Vocabulary Trainer</h1>
              <p className="text-muted-foreground">
                Master words with spaced repetition - review cards when they're due
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Due Today</h3>
                <p className="text-3xl font-bold text-primary">
                  {mockVocabDecks.reduce((sum, deck) => sum + deck.dueCount, 0)}
                </p>
              </Card>
              
              <Card className="p-6 shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Reviewed Today</h3>
                <p className="text-3xl font-bold text-success">{reviewedToday}</p>
              </Card>
              
              <Card className="p-6 shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Retention Rate</h3>
                <p className="text-3xl font-bold text-accent">87%</p>
              </Card>
            </div>

            {/* Decks */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Decks</h2>
              
              {mockVocabDecks.map((deck) => (
                <Card key={deck.id} className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{deck.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{deck.topic}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {deck.cards.length} cards
                        </span>
                        <span className="font-medium text-primary">
                          {deck.dueCount} due
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setSelectedDeck(deck.id)}
                      disabled={deck.dueCount === 0}
                    >
                      {deck.dueCount === 0 ? 'All Done!' : 'Review Now'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review Mode — use the shared Navigation for consistency
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSelectedDeck(null);
                setCurrentCardIndex(0);
                setReviewMode('front');
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Decks
            </Button>

            <span className="font-medium">
              {currentCardIndex + 1} / {deck?.cards.length}
            </span>
          </div>

          <div className="mb-6">
            <Progress value={((currentCardIndex + 1) / (deck?.cards.length || 1)) * 100} className="h-2" />
          </div>

          {currentCard && (
            <Card className="p-12 shadow-lg-custom min-h-[400px] flex flex-col items-center justify-center text-center">
              {reviewMode === 'front' && (
                <>
                  <h2 className="text-4xl font-bold mb-8">{currentCard.word}</h2>
                  <Button 
                    size="lg" 
                    onClick={() => setReviewMode('back')}
                    className="gap-2"
                  >
                    <Eye className="h-5 w-5" />
                    Show Translation
                  </Button>
                </>
              )}

              {reviewMode === 'back' && (
                <>
                  <h2 className="text-3xl font-bold mb-4">{currentCard.word}</h2>
                  <p className="text-xl text-muted-foreground mb-8">{currentCard.translation}</p>
                  
                  <div className="bg-muted/50 rounded-lg p-6 mb-8 max-w-lg">
                    <p className="italic">"{currentCard.example}"</p>
                  </div>

                  <div className="space-y-3 w-full max-w-md">
                    <p className="text-sm font-medium mb-4">How well did you know this?</p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-4"
                      onClick={() => handleRate('hard')}
                    >
                      <XCircle className="mr-3 h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-semibold">Hard</p>
                        <p className="text-xs text-muted-foreground">Review again soon</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-4"
                      onClick={() => handleRate('medium')}
                    >
                      <RotateCcw className="mr-3 h-5 w-5 text-warning" />
                      <div>
                        <p className="font-semibold">Medium</p>
                        <p className="text-xs text-muted-foreground">Review tomorrow</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-4"
                      onClick={() => handleRate('easy')}
                    >
                      <CheckCircle2 className="mr-3 h-5 w-5 text-success" />
                      <div>
                        <p className="font-semibold">Easy</p>
                        <p className="text-xs text-muted-foreground">Review in 3 days</p>
                      </div>
                    </Button>
                  </div>
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}