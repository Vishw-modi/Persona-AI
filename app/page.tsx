"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );

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
        "You are an itinerary generator that helps users plan their trips in detail, with recommendations for activities, transport, and accommodations.",
    },
    {
      label: "Nutrition Advisor",
      value:
        "You give meal suggestions and nutritional tips based on user preferences and dietary needs.",
    },
  ];
  const [selectedBehavior, setSelectedBehavior] = useState(
    behaviorOptions[0].value
  );

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const behaviorPrompt = selectedBehavior;
    const userMessageText = input;
    const fullPrompt = `${behaviorPrompt} ${userMessageText}`;

    const userMessage = { from: "user", text: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // console.log("Sending messages to API:", newMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, fullPrompt }),
      });

      if (!res.body) throw new Error("No Response from server");

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
    } catch (error) {
      console.error("error loading", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full sm:max-w-2xl mx-auto bg-[#1f1f1f] shadow-lg rounded-md overflow-hidden border border-gray-700">
      <header className="p-3 sm:p-4 bg-[#121212] text-white text-lg sm:text-xl font-semibold tracking-wide shadow flex justify-center">
        PersonaAI
      </header>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-4 bg-[#1a1a1a]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] sm:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm shadow transition-all duration-300 ${
                msg.from === "user"
                  ? "bg-[#4c4c4c] text-white rounded-br-none"
                  : "bg-[#2a2a2a] text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.from === "bot" ? (
                <div style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-400 italic animate-pulse">
            Gemini is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <footer className="p-3 sm:p-4 border-t border-gray-700 bg-[#121212]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            className="border border-gray-600 rounded-lg px-2 py-2 text-sm bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={selectedBehavior}
            onChange={(e) => setSelectedBehavior(e.target.value)}
          >
            {behaviorOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#2a2a2a] text-white"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex flex-1 gap-2">
            <input
              className="flex-1 border border-gray-600 rounded-lg px-4 py-2 text-sm bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
