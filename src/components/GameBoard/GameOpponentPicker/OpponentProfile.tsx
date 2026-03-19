import CardBackImg from "@assets/card-back-2.png";

import type { Opponent } from "../types";
import Avatar from "./Avatar";
import Badge from "../Badge";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";

interface OpponentProfileProps extends Opponent {
  selected?: boolean;
  onClick?: () => void;
}

const OpponentProfile = ({
  id,
  username,
  avatarUrl,
  cardCount,
  selected = false,
  onClick,
}: OpponentProfileProps) => {
  const { books } = useGameSessionStore();
  const bookCount = books.filter((book) => book.userId === id).length;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`
        group relative w-[240px] h-[330px] p-5
        flex flex-col items-center gap-4
        rounded-2xl overflow-hidden
        border-2 transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-rave-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30
        hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-22px_rgba(0,0,0,0.75)]
        hover:border-rave-red hover:bg-rave-red/10
        ${selected ? "border-rave-red bg-rave-red/10 shadow-[0_16px_40px_-22px_rgba(0,0,0,0.75)]" : "border-rave-white/10 bg-rave-white/5"}
      `}
    >
      {/* subtle sheen */}
      {/* <div
        className={`
          pointer-events-none absolute inset-x-4 top-3 h-16 rounded-xl
          bg-gradient-to-b from-white/10 to-transparent
          transition-opacity duration-300
          ${selected ? "opacity-90" : "opacity-50 group-hover:opacity-80"}
        `}
      /> */}

      <div
        className={`
    pointer-events-none absolute inset-x-4 top-3 h-16 rounded-xl
    transition-opacity duration-300
    ${selected ? "opacity-90" : "opacity-50 group-hover:opacity-80"}
  `}
        style={{
          // halftone dots (subtle)
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 1.6px)",
          backgroundSize: "8px 8px",

          // fade out downward like your old gradient
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-4">
        <Avatar src={avatarUrl} alt={username} isSelected={selected} />

        {/* badge anchor + nicer placement */}
        <div className="absolute -right-2 top-[88px]">
          <Badge count={cardCount} imageUrl={CardBackImg} />
        </div>
      </div>

      <div className="max-w-full px-2 text-center text-2xl font-bold text-rave-white tracking-widest truncate">
        {username}
      </div>

      <OpponentScore score={bookCount} isSelected={selected} />
    </button>
  );
};

const OpponentScore = ({
  score,
  isSelected,
}: {
  score: number;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`
        w-full rounded-xl px-4 py-2
        flex items-center justify-between
        border transition-all duration-300
        ${isSelected
          ? "bg-rave-red text-rave-white border-white/10 shadow-[0_10px_26px_-18px_rgba(0,0,0,0.7)]"
          : "bg-rave-white/10 text-rave-white/60 border-white/10"}
      `}
    >
      <span className="text-[11px] font-semibold tracking-[0.18em] opacity-80">
        SCORE
      </span>
      <span className="text-lg font-extrabold tabular-nums">{score}</span>
    </div>
  );
};

export default OpponentProfile;