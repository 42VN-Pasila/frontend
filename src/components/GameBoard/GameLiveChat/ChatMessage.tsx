import type { MatchMessageType } from "@/gen/director";
import { useUserStore } from "@/shared/stores/useUserStore";

import { CARD_ICONS, SUIT_ICONS } from "../constants";
import type { CardRank, CardSuit } from "../types";

export interface ChatMessageProps {
  senderUserName: string;
  message: string;
  messageType?: MatchMessageType;
}

const CARD_PATTERN =
  /\b(ACE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN|JACK|QUEEN|KING)\s+of\s+(SPADES|HEARTS|DIAMONDS|CLUBS)\b/;

function renderNotificationMessage(message: string) {
  const match = CARD_PATTERN.exec(message);

  if (!match) {
    return message;
  }

  const [matchedText, rankText, suitText] = match;
  const rank = rankText as CardRank;
  const suit = suitText as CardSuit;

  const RankIcon = CARD_ICONS[suit][rank];
  const SuitIcon = SUIT_ICONS[suit];

  const before = message.slice(0, match.index);
  const after = message.slice(match.index + matchedText.length);

  return (
    <>
      {before}
      <span className="inline-flex items-center gap-1 align-middle">
        <RankIcon className="h-4 w-4" />
        <SuitIcon className="h-3 w-3 opacity-80" />
      </span>
      {after}
    </>
  );
}

export const ChatMessage = ({
  senderUserName,
  message,
  messageType = "Chat",
}: ChatMessageProps) => {
  const { username } = useUserStore();
  const isSender = username === senderUserName;

  return (
    <div
      className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={[
          "max-w-[80%] rounded-md px-3 py-2 text-xs text-rave-white break-words",
          isSender
            ? "border border-rave-red/40 bg-rave-red/10 text-right"
            : "border border-rave-white/15 bg-rave-white/5 text-left",
        ].join(" ")}
      >
        <div className="mb-1 text-[10px] opacity-70">
          {isSender ? "You" : senderUserName}
        </div>

        <div>
          {messageType === "Notification"
            ? renderNotificationMessage(message)
            : message}
        </div>
      </div>
    </div>
  );
};
