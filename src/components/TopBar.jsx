import React from 'react';
import { Sparkles } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-r from-indigo-700/60 via-purple-700/60 to-blue-700/60 backdrop-blur supports-[backdrop-filter]:bg-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 shadow-inner" />
          <h1 className="text-white font-semibold tracking-tight text-lg">CUBIX</h1>
          <span className="ml-2 text-xs text-white/70 hidden sm:inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> AI Prototyping Studio
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/80">
          <span className="px-2 py-1 rounded-md bg-white/10">Chat</span>
          <span className="px-2 py-1 rounded-md bg-white/10">2D</span>
          <span className="px-2 py-1 rounded-md bg-white/10">3D</span>
          <span className="px-2 py-1 rounded-md bg-white/10">Export</span>
        </div>
      </div>
    </header>
  );
}
