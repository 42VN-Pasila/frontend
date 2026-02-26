import CardBack from "@assets/card-back-2.png";
import type { Opponent } from "../../common/types/players";

interface OpponentProfileProps extends Opponent {
  selected?: boolean;
  side: "left" | "right" | "top";
  onClick?: () => void;
}

const OpponentProfile = ({
  id,
  username,
  avatarUrl,
  cardCount,
  side,
  selected = false,
  onClick,
}: OpponentProfileProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex flex-col items-center gap-2 focus:outline-none"
  >
    {/* Container for Avatar and Card Back */}
    <div
      className={`flex items-center gap-4 ${side === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar Div */}
      <div
        className={`
        w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-700 transition-all duration-150 border-2
        ${
          selected
            ? "border-(--color-primary) ring-4 ring-(--color-primary) scale-[1.1] transition-all duration-300 ease-out"
            : "border-transparent opacity-50 group-hover:opacity-100"
        }
      `}
      >
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={username}
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>

      {/* Card Back Div */}
      <div className="relative w-16 h-20 shrink-0 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105">
        <img
          src={CardBack}
          alt="CardBack"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl flex items-center justify-center border-2 w-9 h-9 rounded-full font-black text-white bg-slate-900/50 backdrop-blur-sm shadow-xl">
            {cardCount}
          </span>
        </div>
      </div>
    </div>

    {/* Name tag */}
    <span
      className={`text-xl transition-all duration-200
        ${
          selected
            ? "text-slate-200 opacity-100 font-bold"
            : "text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-slate-200"
        }
      `}
    >
      {username}
    </span>
  </button>
);

export default OpponentProfile;