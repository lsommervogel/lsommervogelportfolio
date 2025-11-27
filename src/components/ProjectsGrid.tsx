import { motion } from "motion/react";
import { GameCard, type Game } from "./GameCard.tsx";
import Typewriter from "typewriter-effect";

interface ProjectsGridProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

export function ProjectsGrid({ games, onGameSelect }: ProjectsGridProps) {
  return (
    <div id="projects" className="pt-16 sm:pt-24 pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-8 sm:mb-12 px-6"
      >
        <div className="flex-1 flex items-center justify-left px 100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
          >
            <h1
              className="text-[18vh] sm:text-[28vh] md:text-[34vh] leading-[0.10]"
              style={{
                fontSize: "clamp(3rem, 3vw + 1vh, 5vh)",
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <span
                className="block text-[4.5vh] sm:text-[6.5vh] md:text-[7.5vh]"
                style={{
                  fontFamily:
                    '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace',
                  letterSpacing: "0.02em",
                }}
              >
                <Typewriter
                  options={{
                    strings: ["My Projects", "Try them !"],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: "natural",
                  }}
                />
              </span>
            </h1>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.9 + index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <GameCard game={game} onClick={() => onGameSelect(game)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
