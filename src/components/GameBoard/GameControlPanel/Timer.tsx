import { useEffect, useRef, useState } from "react";

import { Label } from "@/shared/components/Label";
import { socketSkipTurn } from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

const TURN_SECONDS = 60;

type TimerProps = {
  isDisabled?: boolean;
};

export const Timer = ({ isDisabled = false }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(TURN_SECONDS);
  const hasEmittedSkipRef = useRef(false);
  const { userId } = useUserStore();
  const { matchId, seats } = useGameSessionStore();
  const isMyTurn = seats.find((seat) => seat.userId === userId)?.isTurn ?? false;
  const isTimerActive = isMyTurn && !isDisabled;

  useEffect(() => {
    setTimeLeft(TURN_SECONDS);
    hasEmittedSkipRef.current = false;
  }, [isTimerActive]);

  useEffect(() => {
    if (!isTimerActive) return;

    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(id);
  }, [isTimerActive]);

  useEffect(() => {
    if (!isTimerActive || timeLeft > 0 || hasEmittedSkipRef.current || !matchId || !userId) {
      return;
    }

    hasEmittedSkipRef.current = true;
    void socketSkipTurn({ matchId, userId }).catch(() => {
      hasEmittedSkipRef.current = false;
    });
  }, [isTimerActive, matchId, timeLeft, userId]);

  return (
    <div
      id="timer"
      className={`h-fit p-4 border-b-2 border-rave-white/10 ${timeLeft <= 7 ? " bg-rave-red/30 border-rave-red animate-pulse" : ""}`}
    >
      <Label className="text-5xl text-rave-red/80 ">TIMER</Label>
      <p className="text-6xl font-mono">
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>
    </div>
  );
};
