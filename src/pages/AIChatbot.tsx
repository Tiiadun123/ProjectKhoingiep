import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, ArrowLeft } from "lucide-react";

type PlanKey = "basic" | "premium";
type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
}

interface VocabItem {
  topic: string;
  type: "vocab" | "phrase" | "grammar" | "exercise" | "conversation";
  content: string;
  example?: string;
}

// ----- DỮ LIỆU TIẾNG ANH -----
const ENGLISH_FALLBACK: VocabItem[] = [
  // Vocabulary
  {
    topic: "animals",
    type: "vocab",
    content: "cat - mèo",
    example: "The cat is sleeping on the sofa.",
  },
  {
    topic: "animals",
    type: "vocab",
    content: "dog - chó",
    example: "I walk my dog every morning.",
  },
  {
    topic: "food",
    type: "vocab",
    content: "apple - táo",
    example: "I eat an apple for breakfast.",
  },
  {
    topic: "colors",
    type: "vocab",
    content: "blue - xanh dương",
    example: "The sky is blue today.",
  },

  // Phrases / Conversation
  {
    topic: "phrases",
    type: "phrase",
    content: "break the ice - phá băng (làm quen)",
    example: "He told a joke to break the ice.",
  },
  {
    topic: "conversation",
    type: "conversation",
    content: "How are you? - Bạn khỏe không?",
    example: "A: How are you? B: I'm fine, thank you.",
  },

  // Grammar
  {
    topic: "present simple",
    type: "grammar",
    content: "S + V(s/es) + O",
    example: "I eat breakfast every morning.\nShe plays tennis on Sundays.",
  },
  {
    topic: "present continuous",
    type: "grammar",
    content: "S + am/is/are + V-ing + O",
    example: "I am studying English now.",
  },
  {
    topic: "past simple",
    type: "grammar",
    content: "S + V2 + O",
    example: "I watched a movie yesterday.",
  },
  {
    topic: "future simple",
    type: "grammar",
    content: "S + will + V + O",
    example: "I will call you tomorrow.",
  },
  {
    topic: "conditional 0",
    type: "grammar",
    content: "If + S + V, S + V",
    example: "If you heat water, it boils.",
  },
  {
    topic: "conditional 1",
    type: "grammar",
    content: "If + S + V, S + will + V",
    example: "If it rains, I will stay home.",
  },

  // Exercises
  {
    topic: "present simple exercise",
    type: "exercise",
    content: "Viết 3 câu bằng Present Simple về thói quen hàng ngày của bạn.",
  },
  {
    topic: "past simple exercise",
    type: "exercise",
    content: "Viết 3 câu bằng Past Simple về việc bạn đã làm hôm qua.",
  },
];

// ----- PLAN CONFIG -----
const PLAN_CONFIG: Record<
  PlanKey,
  {
    label: string;
    price: string;
    cadence: string;
    welcome: string;
    dailyLimit: number | "unlimited";
    tone: string;
  }
> = {
  basic: {
    label: "Basic Plan",
    price: "Free",
    cadence: "per day",
    welcome:
      "Xin chào! Bạn đang dùng phiên bản miễn phí, giới hạn 5 lượt chat/ngày.",
    dailyLimit: 5,
    tone: "text-accent",
  },
  premium: {
    label: "Premium Plan",
    price: "N/A",
    cadence: "per year",
    welcome: "Chào mừng Premium! (chỉ dành cho Pro)",
    dailyLimit: "unlimited",
    tone: "text-primary",
  },
};

// ----- NORMALIZE INPUT -----
const normalizeInput = (input: string) => {
  const lower = input.toLowerCase().trim();
  if (lower.includes("present simple") || lower === "present")
    return "present simple";
  if (lower.includes("present continuous")) return "present continuous";
  if (lower.includes("past simple") || lower === "past") return "past simple";
  if (lower.includes("future simple") || lower === "future")
    return "future simple";
  if (lower.includes("conditional")) return "conditional 0"; // free trả về conditional cơ bản
  if (lower.includes("grammar")) return "grammar";
  if (lower.includes("exercise")) return "exercise";
  if (lower.includes("animals")) return "animals";
  if (lower.includes("food")) return "food";
  if (lower.includes("colors")) return "colors";
  if (lower.includes("phrases")) return "phrases";
  if (lower.includes("conversation")) return "conversation";
  return lower;
};

// ----- FALLBACK -----
const getEnglishFallback = (userInput: string) => {
  const normalized = normalizeInput(userInput);

  if (normalized === "grammar") {
    const topics = ENGLISH_FALLBACK.filter((item) => item.type === "grammar");
    return topics
      .map((item) => `${item.topic}:\n${item.content}\nVí dụ:\n${item.example}`)
      .join("\n\n");
  }

  const matched = ENGLISH_FALLBACK.filter((item) =>
    normalized.includes(item.topic)
  );
  if (matched.length === 0) {
    return "Xin lỗi, phiên bản free chưa thể trả lời câu hỏi này. Hãy thử hỏi về animals, food, colors, phrases, grammar, exercise, conversation, các thì (Present, Past, Future), Conditional...";
  }
  return matched
    .map((item) =>
      item.example ? `${item.content}\nVí dụ:\n${item.example}` : item.content
    )
    .join("\n\n");
};

// ----- CLEAN TEXT -----
const sanitizeResponse = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .trim();

// ----- COMPONENT CHÍNH -----
const AIChatbot = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  const activePlan: PlanKey = planFromUrl === "premium" ? "premium" : "basic";
  const plan = PLAN_CONFIG[activePlan];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userMessageCount = useMemo(
    () => messages.filter((msg) => msg.role === "user").length,
    [messages]
  );
  const limitReached =
    plan.dailyLimit !== "unlimited" && userMessageCount >= plan.dailyLimit;
  const chatsLeft =
    plan.dailyLimit === "unlimited" ? "∞" : plan.dailyLimit - userMessageCount;

  useEffect(() => {
    setMessages([
      {
        id: `welcome-${activePlan}`,
        role: "assistant",
        content: plan.welcome,
        createdAt: new Date(),
      },
    ]);
    setInputValue("");
  }, [activePlan, plan.welcome]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    if (limitReached) return alert("Bạn đã dùng hết lượt chat hôm nay.");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiText = sanitizeResponse(getEnglishFallback(trimmed));
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiText,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container py-10">
        <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
          {/* Sidebar plan */}
          <Card className="self-start border-primary/30 shadow-card">
            <CardHeader>
              <Badge
                variant={activePlan === "premium" ? "default" : "secondary"}
              >
                {activePlan === "premium" ? "Recommended" : "Current"}
              </Badge>
              <CardTitle className="text-2xl">{plan.label}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {plan.price} · {plan.cadence}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`font-medium ${plan.tone}`}>
                Số lượt chat còn lại hôm nay: {chatsLeft}
              </p>
              <div className="flex flex-wrap gap-2">
                {(["basic", "premium"] as PlanKey[]).map((key) => (
                  <Button
                    key={key}
                    variant={key === activePlan ? "default" : "outline"}
                    onClick={() => setSearchParams({ plan: key })}
                  >
                    {PLAN_CONFIG[key].label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat area */}
          <Card className="flex min-h-[600px] flex-col shadow-lg">
            <CardHeader className="border-b bg-card flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold">
                  English Chatbot
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Học tiếng Anh cùng BizTalk
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setMessages([
                    {
                      id: `welcome-${activePlan}`,
                      role: "assistant",
                      content: plan.welcome,
                      createdAt: new Date(),
                    },
                  ])
                }
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Xóa lịch sử
              </Button>
            </CardHeader>

            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" /> Đang soạn trả
                      lời...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t bg-card p-4 flex gap-3">
              <Textarea
                placeholder="Nhập câu hỏi..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="min-h-[72px] resize-none"
                disabled={limitReached && !isLoading}
              />
              <Button
                className="h-12 w-24"
                onClick={handleSend}
                disabled={
                  !inputValue.trim() ||
                  isLoading ||
                  (limitReached && !isLoading)
                }
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
