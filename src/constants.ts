export interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "SynthWave Dreams",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Electric Serpent",
    artist: "CyberCore DJ",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Grid Runner",
    artist: "Digital Nomad",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];
