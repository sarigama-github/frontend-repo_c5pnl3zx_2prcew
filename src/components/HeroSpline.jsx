import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] w-full overflow-hidden">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay for brand vibe (doesn't block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/20 to-indigo-900/50" />

      {/* Headline */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white max-w-3xl">
          Describe your idea. Watch a prototype come alive.
        </h2>
        <p className="mt-3 text-white/80 max-w-2xl text-sm sm:text-base">
          CUBIX turns natural language into evolving 2D/3D mockups through a conversational design flow.
        </p>
      </div>
    </section>
  );
}
