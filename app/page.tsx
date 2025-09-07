"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  Sparkles,
  Zap,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

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

  const testimonials = [
    {
      name: "Smit Patel",
      role: "Student",
      content:
        "PersonaAI has revolutionized how I brainstorm ideas. The different personas offer unique perspectives.",
    },
    {
      name: "Keyur Suthar",
      role: "College Professor",
      content:
        "The real-time streaming makes conversations feel incredibly natural and engaging.",
    },
    {
      name: "Nisha Velani",
      role: "College Professor",
      content:
        "Perfect for learning! Each AI persona explains concepts in their own unique way.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
    hover: {
      y: -4,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/50">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 bg-blue-200/20 rounded-full blur-xl"
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-16 w-24 h-24 bg-indigo-200/20 rounded-full blur-xl"
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          className="container mx-auto px-4 py-12 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="mb-4">
              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                PersonaAI
              </motion.h1>
              <motion.div
                className="absolute top-8 left-1/2 transform -translate-x-1/2"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Star className="w-5 h-5 text-yellow-400 absolute -top-6 -left-16" />
                <Star className="w-3 h-3 text-blue-400 absolute -top-8 right-12" />
                <Star className="w-4 h-4 text-indigo-400 absolute top-1 -right-20" />
              </motion.div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed"
            >
              Experience intelligent conversation with multiple AI
              personalities. Choose your perfect AI companion for any task.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/chat" passHref>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <span>
                      Start Chatting
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 bg-transparent"
                  asChild
                >
                  <Link href="/learn-more">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-8 text-sm text-slate-500"
            >
              <div className="text-center">
                <div className="font-semibold text-slate-700">100+</div>
                <div>Active Users</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-700">1000+</div>
                <div>Messages</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-700">7</div>
                <div>AI Personas</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-3">
            Powerful AI Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover what makes PersonaAI the perfect companion for all your
            conversational needs
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-4 text-center h-full flex flex-col">
                  <motion.div
                    className="mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-10 w-10 text-blue-600 mx-auto" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 flex-grow leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 py-10 bg-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-2">
            What Users Say
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <p className="text-slate-600 mb-3 text-sm leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="text-xs">
                    <div className="font-semibold text-slate-800">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50 shadow-xl">
          <CardContent className="p-8 text-center">
            <motion.h2
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Start Conversations?
            </motion.h2>
            <motion.p
              className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of users who are already experiencing the future of
              AI-powered conversations
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/chat" passHref>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <span>
                    Launch PersonaAI
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="border-t border-slate-200/50 py-8 bg-white/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 PersonaAI. Crafted with AI innovation.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
