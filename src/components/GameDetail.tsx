import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Game } from "./GameCard.tsx";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { UnityGame } from "./UnityWebPlayer.tsx";

interface GameDetailProps {
  game: Game;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  direction?: number;
}

export function GameDetail({
  game,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  direction = 0,
}: GameDetailProps) {
  const handleGameAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (game.actionType === "play-browser") {
      setIsPlaying(true);
    }

    if (game.actionType === "download" && game.actionValue) {
      const link = document.createElement("a");
      link.href = game.actionValue;
      link.download = "";
      link.click();
    }

    if (game.actionType === "open-link" && game.actionValue) {
      window.open(game.actionValue, "_blank");
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4"
    >
      {/* Previous Arrow */}
      {!isPlaying && hasPrevious && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onPrevious?.();
          }}
          className="absolute left-4 sm:left-8 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      )}

      {/* Next Arrow */}
      {!isPlaying && hasNext && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          className="absolute right-4 sm:right-8 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      )}

      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={game.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 500, damping: 35 },
            opacity: { duration: 0.15 },
          }}
          className={`bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-y-auto shadow-2xl
        ${
          isPlaying
            ? "max-w-5xl w-full max-h-[95vh]"
            : "max-w-3xl w-full max-h-[90vh]"
        }
      `}
          onClick={(e) => {
            if (!isPlaying) e.stopPropagation();
          }}
        >
          {isPlaying ? (
            <div className="relative w-full h-full">
              {/* Unity wrapper: MUST accept pointer events */}
              <div className="w-full h-full pointer-events-auto">
                <UnityGame
                  path={game.actionValue}
                  onQuit={() => {
                    setIsPlaying(false);
                  }}
                />
              </div>

              {/* Close button: re-enable pointer events only for the button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation(); // close button click handled here
                  setIsPlaying(false); // or onClose()
                }}
                className="pointer-events-auto absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-colors border border-white/10 z-40"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          ) : (
            <>
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                {}
                <motion.img
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.5 }}
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-colors border border-white/10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
              <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-white mb-2">{game.title}</h2>
                      <div className="flex gap-3 text-sm text-gray-400">
                        <span>{game.genre}</span>
                        <span>•</span>
                        <span>{game.year}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center mr-2">
                      {game.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + index * 0.03 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/5 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-white/10"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    {game.actionType !== "none" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGameAction}
                        className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
                      >
                        <game.icon className="w-4 h-4" />
                        {game.actionButton}
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {game.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                ></motion.div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
