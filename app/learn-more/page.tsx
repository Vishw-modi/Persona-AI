"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles, Zap, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

const LearnMore = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Conversational Intelligence",
      description:
        "PersonaAI uses advanced AI models to generate human-like responses tailored to your selected persona.",
    },
    {
      icon: Sparkles,
      title: "Persona Customization",
      description:
        "Switch between personas like 'Travel Guide', 'Nutritionist', or 'Sarcastic Friend' to match your needs.",
    },
    {
      icon: Zap,
      title: "Streaming Responses",
      description:
        "Messages stream in real-time for a seamless and dynamic chat experience.",
    },
    {
      icon: Users,
      title: "Contextual Understanding",
      description:
        "The chat remembers prior messages to stay coherent throughout the conversation.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Discover More About PersonaAI
          </h1>
          <p className="text-lg md:text-xl text-slate-600">
            Learn how PersonaAI works, what makes it powerful, and why users
            love it.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-slate-200 hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <feature.icon className="h-10 w-10 text-slate-700 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/chat">
            <Button className="text-lg px-6 py-4 bg-slate-900 hover:bg-slate-800">
              Try PersonaAI Now
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 bg-white mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500">
            © 2024 PersonaAI. Powered by modern AI innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;
