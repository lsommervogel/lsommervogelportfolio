export type GameActionType = "play-browser" | "download" | "open-link" | "none";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  year: string;
  description: string;
  actionButton: string;
  technologies: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  actionType: GameActionType;
  actionValue: string;
}

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-300 flex flex-col justify-end p-5">
        <p className="text-white mb-1 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-1">
          {game.title}
        </p>
        <p className="text-gray-400 text-sm transform transition-all duration-300 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
          {game.genre}
        </p>
      </div>
    </div>
  );
}
