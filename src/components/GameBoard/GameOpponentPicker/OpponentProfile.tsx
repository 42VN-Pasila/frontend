import CardBackImg from "@assets/card-back-2.png";

// import type { Opponent } from "../../../pages/Game/common/types/players";
import type { Opponent } from "../types"
import Avatar from "./Avatar";
import Badge from "../Badge";
import NameTag from "./NameTag";

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
      className="group flex flex-col items-center gap-4 focus:outline-none"
    >
      <div
        className={`flex items-center gap-4 flex-col`}
      >
        <Avatar src={avatarUrl} alt={username} isSelected={selected} />

        <Badge
          variant="card"
          count={cardCount}
          imageUrl={CardBackImg}
        />
      </div>

      <NameTag isSelected={selected}>{username}</NameTag>
    </button>
  );
};

export default OpponentProfile;
