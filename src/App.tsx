import { GameDetail } from "./components/GameDetail";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { HeroSection } from "./components/HeroSection";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { games } from "./data/developerData";
import { useGameNavigation } from "./hooks/useGameNavigation";

export default function App() {
  const {
    selectedGame,
    setSelectedGame,
    direction,
    handlePreviousGame,
    handleNextGame,
    hasPrevious,
    hasNext,
  } = useGameNavigation(games);
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundEffects />
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <ProjectsGrid games={games} onGameSelect={setSelectedGame} />
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <GameDetail
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onPrevious={handlePreviousGame}
          onNext={handleNextGame}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          direction={direction}
        />
      )}
    </div>
  );
}
