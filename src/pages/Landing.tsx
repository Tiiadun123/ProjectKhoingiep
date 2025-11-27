import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProBadge } from "@/components/ProBadge";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mic, BookOpen, TrendingUp, MessageSquare, 
  CheckCircle2, Sparkles, Globe, Award, 
  Rocket, Mail, MapPin, Phone
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation showAuthButtons={true} />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-warning rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Master English with
              <br />
              <span className="text-accent">AI-Powered Learning</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Personalized lessons, real-time speech correction, and adaptive vocabulary training. 
              Your path to global fluency starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/placement-test">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Award className="mr-2 h-5 w-5" />
                  Take Placement Test
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  View Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to improve all aspects of your English proficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Placement Test</h3>
              <p className="text-muted-foreground">
                Multi-dimensional assessment covering grammar, reading, and speaking to determine your exact level (A1-C2).
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Speech Correction
                <ProBadge className="ml-2" />
              </h3>
              <p className="text-muted-foreground">
                Real-time pronunciation analysis with phoneme-level feedback, intonation tracking, and native comparison.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                AI Chatbot
                <ProBadge className="ml-2" />
              </h3>
              <p className="text-muted-foreground">
                Practice workplace conversations with AI-powered role-play scenarios and instant pronunciation feedback.
              </p>
            </Card>
            {/* Add more cards as needed */}
          </div>
        </div>
      </section>

      {/* About Us Section - Startup Story */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Rocket className="h-4 w-4" /> Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Empowering Global Communication
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  BizTalk began with a simple idea: Language should be a bridge, not a barrier. As a startup founded by passionate educators and AI engineers, we realized that traditional learning methods were leaving professionals behind.
                </p>
                <p>
                  We are building the future of language acquisition—where Artificial Intelligence meets human pedagogy. Our goal is to help 1 million professionals confidently express themselves on the global stage.
                </p>
                <p>
                  Join us on this journey to break down borders and unlock career potential through the power of English.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Card className="p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
                    <p className="text-sm text-muted-foreground">Active Learners</p>
                  </Card>
                  <Card className="p-6 shadow-lg mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <h3 className="text-4xl font-bold text-accent mb-2">95%</h3>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </Card>
                  <Card className="p-6 shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <h3 className="text-4xl font-bold text-warning mb-2">24/7</h3>
                    <p className="text-sm text-muted-foreground">AI Availability</p>
                  </Card>
                  <Card className="p-6 shadow-lg mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <h3 className="text-4xl font-bold text-success mb-2">50+</h3>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your learning pace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 shadow-card">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Free Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">0 VND</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Forever</p>
              </div>
              
              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Access to basic grammar & vocabulary</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>5 Basic Email Modules</span>
                </li>
              </ul>
              
              <Link to="/placement-test" className="block">
                <Button variant="outline" className="w-full">
                  Start for Free
                </Button>
              </Link>
            </Card>

            {/* Basic Plan */}
            <Card className="p-8 shadow-lg-custom border-2 border-accent">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">179,000 VND</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">/month</p>
              </div>
              
              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Access to 10 Email Modules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Limited AI Practice (5/day)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Basic Feedback (Grammar/Pronunciation)</span>
                </li>
              </ul>
              
              <Link to="/ai-chatbot?plan=basic" className="block">
                <Button className="w-full">
                  Choose Basic
                </Button>
              </Link>
            </Card>

            {/* Premium Plan */}
            <Card className="p-8 shadow-lg-custom border-2 border-primary relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <ProBadge />
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">1,990,000 VND</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">/year</p>
              </div>
              
              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Unlimited AI Practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Deep Expert Feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Soft Skills Toolkit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Detailed Progress Reports</span>
                </li>
              </ul>
              
              <Link to="/ai-chatbot?plan=premium" className="block">
                <Button className="w-full gradient-pro text-white border-none hover:opacity-90">
                  Choose Premium
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about our courses or enterprise solutions? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-muted-foreground">support@biztalk.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Office</h4>
                    <p className="text-muted-foreground">TechnoPark Tower, Hanoi, Vietnam</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-muted-foreground">(+84) 123 456 789</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 shadow-card">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center gradient-card border-primary/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the placement test now and get your personalized learning path in minutes.
            </p>
            <Link to="/placement-test">
              <Button size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Begin Placement Test
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">BizTalk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 BizTalk. Empowering English learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}