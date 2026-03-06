import CardBackImg from "@assets/card-back-2.png";

// import type { Opponent } from "../../../pages/Game/common/types/players";
import type { Opponent } from "../types"
import Avatar from "./Avatar";
import Badge from "../Badge";

interface OpponentProfileProps extends Opponent {
  selected?: boolean;
  onClick?: () => void;
}

const OpponentProfile = ({
  username,
  avatarUrl,
  cardCount,
  selected = false,
  onClick,
}: OpponentProfileProps) => {

  return (
    <button
      type="button"
      onClick={onClick}
      className="
      relative w-[240px] h-[330px] p-5
      border-2 border-rave-white/10  hover:border-rave-red hover:bg-rave-red/10 transition-all duration-300
      group flex flex-col items-center gap-4 focus:outline-none"
    >
      <div
        className={`flex items-center gap-4 flex-col relative`}
      >
        <Avatar src={avatarUrl} alt={username} isSelected={selected} />

        <div className=" absolute top-25 right-[-3px]"><Badge
          count={cardCount}
          imageUrl={CardBackImg}
        /></div>
      </div>

      <p className="text-2xl font-bold text-rave-white tracking-widest">{username}</p>
      <div className="flex items-center gap-2 bg-rave-white/10  px-4 py-2">
        <p className="text-sm text-rave-white/50">SCORE</p>
        <p className="text-sm text-rave-white/50">10</p>
      </div>
    </button>
  );
};

export default OpponentProfile;
