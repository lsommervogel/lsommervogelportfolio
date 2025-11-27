import { useState } from "react";
import type { Game } from "../components/GameCard.tsx";

export function useGameNavigation(games: Game[]) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [direction, setDirection] = useState(0);

  const handlePreviousGame = () => {
    if (!selectedGame) return;
    const currentIndex = games.findIndex((g) => g.id === selectedGame.id);
    if (currentIndex > 0) {
      setDirection(-1);
      setSelectedGame(games[currentIndex - 1]);
    }
  };

  const handleNextGame = () => {
    if (!selectedGame) return;
    const currentIndex = games.findIndex((g) => g.id === selectedGame.id);
    if (currentIndex < games.length - 1) {
      setDirection(1);
      setSelectedGame(games[currentIndex + 1]);
    }
  };

  const currentGameIndex = selectedGame
    ? games.findIndex((g) => g.id === selectedGame.id)
    : -1;
  const hasPrevious = currentGameIndex > 0;
  const hasNext = currentGameIndex < games.length - 1;

  return {
    selectedGame,
    setSelectedGame,
    direction,
    handlePreviousGame,
    handleNextGame,
    hasPrevious,
    hasNext,
  };
}
