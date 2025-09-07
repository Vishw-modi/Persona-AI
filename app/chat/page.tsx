"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, ArrowLeft, Bot, User, Sparkles } from "lucide-react";
import Link from "next/link";

const Chat = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [selectedBehavior, setSelectedBehavior] = useState(
    "You are a helpful and informative chatbot."
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollRef = useRef(true);

  const behaviorOptions = [
    { label: "Default", value: "You are a helpful and informative chatbot." },
    {
      label: "Friendly Sarcastic",
      value: "You are a friendly and sarcastic assistant.",
    },
    {
      label: "Enthusiastic Travel Guide",
      value: "You are an enthusiastic and slightly dramatic travel guide.",
    },
    { label: "Concise and Direct", value: "Respond concisely and directly." },
    {
      label: "Formal and Professional",
      value: "Respond in a formal and professional manner.",
    },
    {
      label: "Itinerary Generator",
      value:
        "You are an itinerary generator that helps users plan their trips in detail.",
    },
    {
      label: "Nutrition Advisor",
      value:
        "You give meal suggestions and nutritional tips based on user preferences and dietary needs. If the question is not about food, health, or nutrition, respond with: I'm here to help with food and nutrition. Could you ask something related to that?",
    },
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isAutoScrollRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 60;
    const atBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;
    isAutoScrollRef.current = atBottom;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const fullPrompt = `${selectedBehavior} ${input}`;
    const userMessage = { from: "user", text: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, fullPrompt }),
      });

      if (!res.body) throw new Error("No response from server");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";
      let done = false;

      setMessages((prev) => [...prev, { from: "bot", text: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        botMessage += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.from === "bot") {
            last.text = botMessage;
          }
          return updated;
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("error loading", error);
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/80 backdrop-blur-xl relative z-10"
      >
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className="text-slate-700 hover:bg-white/60"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Home
            </Button>
          </motion.div>
        </Link>
        <motion.div
          className="flex items-center space-x-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PersonaAI Chat
          </h1>
        </motion.div>
        <div className="w-24" />
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-100 text-red-600 text-sm text-center py-2 border-b border-red-200"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-4 py-3 bg-white/60 backdrop-blur-sm border-b border-white/20 relative z-10"
      >
        <Select value={selectedBehavior} onValueChange={setSelectedBehavior}>
          <SelectTrigger className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-slate-200 text-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200">
            {behaviorOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-slate-900 hover:bg-blue-50"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 relative z-10"
      >
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-slate-500 mt-12"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Bot className="h-12 w-12 mx-auto mb-3 opacity-60 text-blue-500" />
              </motion.div>
              <p className="text-lg font-medium">
                Start a conversation with PersonaAI
              </p>
              <p className="text-sm mt-1 opacity-75">
                Choose a persona and type your message below
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[85%] ${
                  msg.from === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  {msg.from === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-blue-600" />
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
                      : "bg-white/80 text-slate-900 rounded-bl-md border border-white/20"
                  }`}
                >
                  {msg.from === "bot" ? (
                    <div className="prose prose-slate prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md border border-white/20">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 py-3 bg-white/80 backdrop-blur-xl border-t border-white/20 relative z-10"
      >
        <div className="flex space-x-3">
          <motion.div className="flex-1" whileFocus={{ scale: 1.02 }}>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="bg-white/60 backdrop-blur-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
              disabled={loading}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
