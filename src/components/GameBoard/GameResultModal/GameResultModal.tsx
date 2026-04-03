import { useEffect, useState } from "react";

import type { MatchResultDto } from "@/gen/director";
import Button from "@/shared/components/Button";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

interface GameResultModalProps {
  result: MatchResultDto;
  onClose: () => void;
}

type Phase = "picking" | "reveal" | "result";

const CYCLE_COUNT = 3;
const REVEAL_PAUSE_MS = 1400;
const BASE_INTERVAL_MS = 80;
const MAX_INTERVAL_MS = 350;

export const GameResultModal = ({ result, onClose }: GameResultModalProps) => {
  const { username } = useUserStore();
  const { opponents } = useGameSessionStore();
  const currentUsername = username.trim();

  const [phase, setPhase] = useState<Phase>(
    result.hasCoWinners ? "picking" : "result",
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(!result.hasCoWinners);

  const players = opponents.length > 0 ? opponents : [];
  const winnerIdx = players.findIndex((p) => p.id === result.winnerUsername);
  const totalSteps = players.length * CYCLE_COUNT + Math.max(winnerIdx, 0);

  useEffect(() => {
    if (phase !== "picking" || players.length === 0) return;

    let tick = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      tick++;
      setActiveIndex(tick % players.length);

      if (tick >= totalSteps) {
        setPhase("reveal");
        return;
      }

      const progress = tick / totalSteps;
      const delay =
        BASE_INTERVAL_MS + progress * (MAX_INTERVAL_MS - BASE_INTERVAL_MS);
      timeout = setTimeout(step, delay);
    };

    timeout = setTimeout(step, 500);
    return () => clearTimeout(timeout);
  }, [phase, players.length, totalSteps]);

  useEffect(() => {
    if (phase !== "reveal") return;

    const timeout = setTimeout(() => {
      setPhase("result");
      requestAnimationFrame(() => setFadeIn(true));
    }, REVEAL_PAUSE_MS);

    return () => clearTimeout(timeout);
  }, [phase]);

  const isWinner = result.winnerUsername === currentUsername;
  const isAbandoned = result.endedReason === "Abandoned";

  const headingText = isAbandoned
    ? isWinner
      ? "OPPONENT LEFT"
      : "ABANDONED"
    : isWinner
      ? "YOU WIN"
      : "YOU LOSE";

  const startedAt = new Date(result.startedAt);
  const endedAt = new Date(result.endedAt);
  const durationMs = endedAt.getTime() - startedAt.getTime();
  const durationMin = Math.floor(durationMs / 60_000);
  const durationSec = Math.floor((durationMs % 60_000) / 1_000);

  if (phase === "picking" || phase === "reveal") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="flex w-full max-w-lg flex-col items-center gap-10 border-2 border-rave-white/10 bg-rave-black p-14 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
          <span className="text-lg font-bold tracking-[0.3em] text-rave-white/50">
            PICKING THE LUCKY ONE
          </span>

          <div className="flex w-full flex-col gap-3">
            {players.map((player, i) => {
              const isHighlighted = i === activeIndex;
              const isRevealed = phase === "reveal" && i === activeIndex;

              return (
                <div
                  key={player.id}
                  className={`flex items-center gap-4 rounded-xl border-2 px-6 py-5 transition-all duration-150 ${
                    isRevealed
                      ? "scale-105 border-emerald-400 bg-emerald-400/15 shadow-[0_0_24px_-6px_rgba(52,211,153,0.4)]"
                      : isHighlighted
                        ? "border-rave-red bg-rave-red/10"
                        : "border-rave-white/5 bg-transparent"
                  }`}
                >
                  {player.avatarUrl ? (
                    <img
                      src={player.avatarUrl}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rave-white/10 text-base font-bold text-rave-white/60">
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span
                    className={`text-2xl font-bold tracking-widest transition-colors duration-150 ${
                      isRevealed
                        ? "text-emerald-400"
                        : isHighlighted
                          ? "text-rave-white"
                          : "text-rave-white/30"
                    }`}
                  >
                    {player.username}
                  </span>

                  {isRevealed && (
                    <span className="ml-auto text-sm font-semibold tracking-[0.2em] text-emerald-400 animate-pulse">
                      WINNER
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`flex w-full max-w-md flex-col items-center gap-6 border-2 border-rave-white/10 bg-rave-black p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 ${
          fadeIn ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Result heading */}
        <div className="flex flex-col items-center gap-2">
          <span
            className={`text-4xl font-black tracking-widest ${
              isAbandoned
                ? "text-amber-400"
                : isWinner
                  ? "text-emerald-400"
                  : "text-rave-red"
            }`}
          >
            {headingText}
          </span>

          <span className="text-xs tracking-[0.2em] text-rave-white/50">
            {result.endedReason.toUpperCase().replace(/_/g, " ")}
          </span>
        </div>

        {/* Stats */}
        <div className="flex w-full justify-around border-y border-rave-white/10 py-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-rave-white/50">
              DURATION
            </span>
            <span className="text-lg font-bold text-rave-white">
              {String(durationMin).padStart(2, "0")}:
              {String(durationSec).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Action */}
        <Button
          variant="primary"
          emphasis="high"
          size="large"
          fullWidth
          onClick={onClose}
        >
          BACK TO DASHBOARD
        </Button>
      </div>
    </div>
  );
};

export default GameResultModal;
