import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpCircle, Download, Share2 } from 'lucide-react';

export default function ChatPanel({ onUpdateInstructions }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to CUBIX! Describe your invention. I will ask clarifying questions about size, materials, function, and style, and keep your prototype updated in real time.' },
  ]);
  const [input, setInput] = useState('A compact desk organizer that holds pens, sticky notes, and a phone');
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const content = input.trim();
    if (!content) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');

    // Fake AI clarification to simulate flow (replace with backend later)
    const clarification =
      'What are the approximate dimensions? Any preferred materials (e.g., wood, plastic)? Should the phone rest vertically or at an angle?';

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: clarification }]);
    }, 400);

    // Emit simplified instruction set for the visualizers
    onUpdateInstructions?.(content);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/5 backdrop-blur">
      <div ref={listRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm sm:text-[15px] leading-relaxed shadow ${
              m.role === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-2 sm:p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your idea..."
            rows={2}
            className="flex-1 resize-none rounded-xl bg-white/10 text-white placeholder-white/60 p-3 outline-none focus:ring-2 focus:ring-indigo-400/60"
          />
          <button
            onClick={handleSend}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition"
          >
            <ArrowUpCircle className="h-5 w-5" />
            Send
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-white/70">
          <span>AI will ask clarifying questions automatically.</span>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1 hover:text-white transition">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="inline-flex items-center gap-1 hover:text-white transition">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
