import CardBackImg from "@assets/card-back-2.png";
import BadgeYellow from "@assets/Badge-yellow.svg"

import type { Opponent } from "../../common/types/players";

import Avatar from "./Avatar";
import Badge from "./Badge";
import NameTag from "./NameTag";

interface OpponentProfileProps extends Opponent {
  selected?: boolean;
  side: "left" | "right" | "top";
  onClick?: () => void;
}

const OpponentProfile = ({
  username,
  avatarUrl,
  cardCount,
  side,
  selected = false,
  onClick,
}: OpponentProfileProps) => {
  const isRightSide = side === "right";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-4 focus:outline-none"
    >
      <div
        className={`flex items-center gap-4 ${isRightSide ? "flex-row-reverse" : "flex-row"}`}
      >
        <Avatar src={avatarUrl} alt={username} isSelected={selected} />

        <Badge
          variant="card"
          count={cardCount}
          imageUrl={CardBackImg}
        />
        <Badge
          variant="circle"
          count={cardCount}
          imageUrl={BadgeYellow}
        />
      </div>

      <NameTag isSelected={selected}>{username}</NameTag>
    </button>
  );
};

export default OpponentProfile;
