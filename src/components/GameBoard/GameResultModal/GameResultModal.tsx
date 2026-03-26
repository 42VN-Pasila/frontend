import type { MatchResultDto } from "@/gen/director";
import Button from "@/shared/components/Button";
import { useUserStore } from "@/shared/stores/useUserStore";

interface GameResultModalProps {
  result: MatchResultDto;
  onClose: () => void;
}

export const GameResultModal = ({ result, onClose }: GameResultModalProps) => {
  const { userId } = useUserStore();

  const isWinner = result.winnerUserId === userId;
  const isDraw = result.winnerUserId === null;

  const startedAt = new Date(result.startedAt);
  const completedAt = new Date(result.completedAt);
  const durationMs = completedAt.getTime() - startedAt.getTime();
  const durationMin = Math.floor(durationMs / 60_000);
  const durationSec = Math.floor((durationMs % 60_000) / 1_000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col items-center gap-6 border-2 border-rave-white/10 bg-rave-black p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
        {/* Result heading */}
        <div className="flex flex-col items-center gap-2">
          <span
            className={`text-4xl font-black tracking-widest ${
              isDraw
                ? "text-rave-white/70"
                : isWinner
                  ? "text-emerald-400"
                  : "text-rave-red"
            }`}
          >
            {isDraw ? "DRAW" : isWinner ? "YOU WIN" : "YOU LOSE"}
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
