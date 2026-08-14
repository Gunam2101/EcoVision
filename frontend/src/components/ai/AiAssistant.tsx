'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Leaf, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your OpenAI-Powered EcoVision AI Assistant. Ask me anything about identifying reusable vs single-use items, recycling pens, chargers, mobiles, glass jars, or carbon offset impact!',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Build conversation history for OpenAI
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await axios.post('/api/ai-chat', {
        message: messageText,
        history: historyPayload,
      });

      const replyText = res.data?.reply || 'EcoVision AI: Always prioritize REUSABLE items!';

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '♻️ **Item Analysis**: Prioritize REUSABLE items (Mobiles, Chargers, Refillable Pens, Glass Jars, Canvas Totes) over single-use plastic waste!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform flex items-center gap-2 group border-2 border-emerald-300"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="hidden md:inline text-xs font-mono tracking-wider font-extrabold uppercase">
          AI Assistant
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[520px] glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl bg-[#0B0F17]/95 backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          <div className="p-4 bg-emerald-500/10 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  EcoVision AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-mono">OpenAI GPT-4o Powered Advisor</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-black font-semibold rounded-br-none'
                      : 'bg-gray-900/90 text-gray-200 border border-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[9px] opacity-60 mt-1 font-mono text-right">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-emerald-400 text-xs py-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="font-mono text-[11px] animate-pulse">OpenAI AI is generating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 bg-gray-950/60 border-t border-gray-800/80 flex gap-2 overflow-x-auto text-[10px] font-mono no-scrollbar">
            <button onClick={() => handleSend("Are mobile phones reusable?")} className="px-2.5 py-1 rounded-full bg-gray-900 hover:bg-gray-800 text-emerald-400 whitespace-nowrap border border-gray-800">
              📱 Mobile Phones
            </button>
            <button onClick={() => handleSend("How do I recycle chargers and cables?")} className="px-2.5 py-1 rounded-full bg-gray-900 hover:bg-gray-800 text-emerald-400 whitespace-nowrap border border-gray-800">
              🔌 Chargers & Cables
            </button>
            <button onClick={() => handleSend("What is the CO2 savings of refillable pens?")} className="px-2.5 py-1 rounded-full bg-gray-900 hover:bg-gray-800 text-emerald-400 whitespace-nowrap border border-gray-800">
              ✒️ Refillable Pens
            </button>
          </div>

          <div className="p-3 bg-gray-950 border-t border-gray-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask OpenAI Chatbot about waste & reusability..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <button onClick={() => handleSend()} disabled={loading} className="p-2 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>

        </div>
      )}
    </>
  );
};
