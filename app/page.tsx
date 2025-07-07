"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart Conversations",
      description:
        "Engage in natural, intelligent dialogue with advanced AI capabilities",
    },
    {
      icon: Sparkles,
      title: "Multiple Personas",
      description:
        "Choose from various AI personalities to match your conversation style",
    },
    {
      icon: Zap,
      title: "Real-time Streaming",
      description:
        "Experience lightning-fast responses with real-time message streaming",
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description:
        "Tailored responses based on your selected AI behavior and preferences",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 animate-fade-in">
              PersonaAI
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 animate-fade-in delay-200">
              Experience intelligent conversation with multiple AI personalities
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in delay-300">
              <Link href="/chat" passHref>
                <Button asChild>
                  <span>
                    Start Chatting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="..." asChild>
                <Link href="/learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Powerful AI Features
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover what makes PersonaAI the perfect companion for all your
            conversational needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 bg-white">
        <Card className="bg-slate-100 border-slate-200">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Start Conversations?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the future of
              AI-powered conversations
            </p>
            <Link href="/chat" passHref>
              <Button asChild>
                <span>
                  Launch PersonaAI
                  <MessageCircle className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500">
            © 2025 PersonaAI. Crafted with AI innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
