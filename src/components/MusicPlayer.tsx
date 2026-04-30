import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { songs } from '../constants';

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipSong = (direction: number) => {
    let nextIndex = currentSongIndex + direction;
    if (nextIndex < 0) nextIndex = songs.length - 1;
    if (nextIndex >= songs.length) nextIndex = 0;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-md border-2 border-magenta-500 p-6 bg-black text-cyan-400 shadow-[0_0_15px_rgba(236,72,153,0.5)] glitch-hover">
      <h2 className="text-xl font-bold mb-2 uppercase tracking-widest text-cyan-300">{currentSong.title}</h2>
      <p className="text-sm mb-6 text-magenta-500 uppercase tracking-tighter">ID: {currentSong.artist}</p>
      
      <audio ref={audioRef} src={currentSong.url} />
      
      <div className="flex justify-center items-center gap-8">
        <button onClick={() => skipSong(-1)} className="hover:text-magenta-500 transition-colors"><SkipBack /></button>
        <button onClick={togglePlay} className="p-4 border-2 border-cyan-400 rounded-none hover:bg-magenta-900 hover:text-white transition-all">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={() => skipSong(1)} className="hover:text-magenta-500 transition-colors"><SkipForward /></button>
      </div>
    </div>
  );
}
