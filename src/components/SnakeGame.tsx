import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(true);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    onScoreUpdate(0);
  }, [onScoreUpdate]);

  const moveSnake = useCallback(() => {
    if (gameOver || paused) return;

    setSnake((prev) => {
      const newSnake = [...prev];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prev;
      }

      for (let i = 1; i < newSnake.length; i++) {
        if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
          setGameOver(true);
          return prev;
        }
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((s) => {
          const newScore = s + 10;
          onScoreUpdate(newScore);
          return newScore;
        });
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, onScoreUpdate, paused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!paused) {
      gameLoopRef.current = setInterval(moveSnake, 150);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [moveSnake, paused]);

  return (
    <div className="relative border-4 border-cyan-400 p-1 shadow-[0_0_15px_rgba(34,211,238,0.7)] bg-black glitch-hover">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)` }}>
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnakeHead = snake[0].x === x && snake[0].y === y;
          const isSnakeBody = snake.slice(1).some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          
          return (
            <div
              key={i}
              className={`w-5 h-5 ${isSnakeHead ? 'bg-magenta-500' : isSnakeBody ? 'bg-cyan-400' : isFood ? 'bg-yellow-400 animate-pulse' : 'bg-gray-950'}`}
            />
          );
        })}
      </div>
      {(gameOver || paused) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-cyan-400 border border-magenta-500">
          {gameOver ? (
            <>
              <p className="text-2xl font-bold mb-4 text-magenta-500 glitch-hover">SYSTEM_CRASH</p>
              <button onClick={resetGame} className="px-6 py-2 border-2 border-cyan-400 hover:bg-magenta-900 hover:text-white uppercase tracking-widest transition-colors">REBOOT</button>
            </>
          ) : (
            <button onClick={() => setPaused(false)} className="px-6 py-2 border-2 border-cyan-400 hover:bg-magenta-900 hover:text-white uppercase tracking-widest transition-colors">INIT_SEQUENCE</button>
          )}
        </div>
      )}
    </div>
  );
}
