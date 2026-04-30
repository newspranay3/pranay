/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-8 flex flex-col items-center gap-8 font-mono relative">
      <div className="scanline" />
      <div className="noise-overlay" />
      
      <h1 className="text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-cyan-300 to-magenta-500 glitch-hover">
        NEON_GROOVE_SNAKE
      </h1>
      
      <div className="flex gap-4 mb-4 text-3xl border-2 border-magenta-500 p-4 shadow-[0_0_10px_rgba(236,72,153,0.5)]">
        <span className="text-magenta-500">SCORE: {score.toString().padStart(4, '0')}</span>
      </div>

      <SnakeGame onScoreUpdate={setScore} />
      
      <MusicPlayer />

      <footer className="mt-auto text-sm text-cyan-900 tracking-[0.2em] uppercase">
        SYSTEM_FAILURE_IMMINENT // V.0.1
      </footer>
    </div>
  );
}
