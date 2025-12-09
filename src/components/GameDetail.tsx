import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Game } from "./GameCard.tsx";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { UnityGame } from "./UnityWebPlayer.tsx";
import { useIsVertical } from "../hooks/useIsVertical";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const isVertical = useIsVertical();

  const handleGameAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (game.actionType === "play-browser") setIsPlaying(true);

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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
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
      {/* Desktop-style arrows (only when NOT vertical & NOT playing) */}
      {!isVertical && !isPlaying && hasPrevious && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious?.();
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className="absolute left-4 sm:left-8 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 
          backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      )}

      {!isVertical && !isPlaying && hasNext && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: 5 }}
          className="absolute right-4 sm:right-8 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20
          backdrop-blur-sm border border-white/20 flex items-center justify-center text-white"
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
        >
          {!isPlaying ? (
            <>
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <motion.img
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.5 }}
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20
                  backdrop-blur-sm text-white rounded-full p-2 border border-white/10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-white mb-2">{game.title}</h2>
                    <div className="flex gap-3 text-sm text-gray-400">
                      <span>{game.genre}</span>
                      <span>•</span>
                      <span>{game.year}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {game.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + index * 0.03 }}
                        className="bg-white/5 text-gray-300 px-3 py-1.5 rounded-full text-xs border border-white/10"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action button */}
                  {game.actionType !== "none" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGameAction}
                      className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full"
                    >
                      <game.icon className="w-4 h-4" />
                      {game.actionButton}
                    </motion.button>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {game.description}
                </p>

                {/* MOBILE ARROWS BELOW CONTENT */}
                {isVertical && !isPlaying && (hasPrevious || hasNext) && (
                  <div className="flex justify-between px-4">
                    {hasPrevious && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => onPrevious?.()}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20
                        flex items-center justify-center text-white"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>
                    )}
                    {!hasPrevious && <div className="w-12 h-12" />}

                    {hasNext && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => onNext?.()}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20
                        flex items-center justify-center text-white"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* PLAY MODE (Unity) */
            <div className="relative w-full h-full">
              <div className="w-full h-full pointer-events-auto">
                <UnityGame
                  path={game.actionValue}
                  onQuit={() => setIsPlaying(false)}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={() => setIsPlaying(false)}
                className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm
                p-2 rounded-full border border-white/10 text-white"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
