"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, ArrowLeft, Bot, User } from "lucide-react";
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
        "You give meal suggestions and nutritional tips based on user preferences and dietary needs.",
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
    <div className="h-screen w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <Link href="/">
          <Button variant="ghost" className="text-slate-700 hover:bg-slate-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-slate-900">PersonaAI Chat</h1>
        <div className="w-24" />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 text-sm text-center py-2">
          {error}
        </div>
      )}

      {/* Persona Selector */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <Select value={selectedBehavior} onValueChange={setSelectedBehavior}>
          <SelectTrigger className="w-full max-w-md mx-auto bg-white border-slate-300 text-slate-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200">
            {behaviorOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-slate-900"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-20">
            <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Start a conversation with PersonaAI</p>
            <p className="text-sm mt-2">
              Choose a persona and type your message below
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-3 max-w-[80%] ${
                msg.from === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.from === "user" ? "bg-slate-700" : "bg-slate-200"
                }`}
              >
                {msg.from === "user" ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-slate-700" />
                )}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  msg.from === "user"
                    ? "bg-slate-900 text-white rounded-br-md"
                    : "bg-slate-100 text-slate-900 rounded-bl-md"
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
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <Bot className="h-4 w-4 text-slate-700" />
              </div>
              <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex space-x-4">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={loading}
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
