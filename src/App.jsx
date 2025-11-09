import React, { useState } from 'react';
import TopBar from './components/TopBar';
import HeroSpline from './components/HeroSpline';
import ChatPanel from './components/ChatPanel';
import VisualizerPanel from './components/VisualizerPanel';

export default function App() {
  const [instructions, setInstructions] = useState('');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white">
      <TopBar />
      <HeroSpline />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">
            <h3 className="mb-3 text-sm uppercase tracking-wider text-white/60">Conversation</h3>
            <ChatPanel onUpdateInstructions={setInstructions} />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="mb-3 text-sm uppercase tracking-wider text-white/60">Live Prototype</h3>
            <VisualizerPanel instructions={instructions} />
            <div className="mt-3 text-xs text-white/70">
              The 2D sketch updates as the conversation evolves. A basic 3D viewer can be added next.
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} CUBIX • AI-powered conversational prototyping
      </footer>
    </div>
  );
}
