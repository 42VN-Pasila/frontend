import { useEffect } from "react";
import type { MatchDto } from "@/gen/director";
import {
  connectSocket,
  disconnectSocket,
  socketJoinMatch,
  socketLeaveMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";

const HIDDEN_TAB_LEAVE_DELAY_MS = 30_000;

export function useAbandonmentGuard(
  matchId: string,
  username: string,
  isExitingGame: boolean,
  isMatchOver: boolean,
  setErrorMessage: (msg: string | null) => void,
) {
  const syncMatchState = useGameSessionStore((s) => s.syncMatchState);

  const canSyncMatchState = (match: MatchDto) => match.status !== "Completed";

  useEffect(() => {
    if (!matchId || !username) return;

    let hiddenLeaveTimeoutId: number | null = null;
    let hasLeftMatch = false;

    const clearHiddenLeaveTimeout = () => {
      if (hiddenLeaveTimeoutId === null) return;
      window.clearTimeout(hiddenLeaveTimeoutId);
      hiddenLeaveTimeoutId = null;
    };

    const leaveMatchForAbandonment = async () => {
      if (hasLeftMatch || isExitingGame || isMatchOver) return;
      hasLeftMatch = true;
      clearHiddenLeaveTimeout();

      try {
        await socketLeaveMatch({ matchId, username });
      } finally {
        disconnectSocket();
      }
    };

    const rejoinAfterTemporaryLeave = async () => {
      if (!hasLeftMatch || isExitingGame || isMatchOver) return;

      try {
        connectSocket();
        const { match } = await socketJoinMatch({ matchId, username });
        if (canSyncMatchState(match)) {
          syncMatchState(match, username);
        } else {
          disconnectSocket();
        }
        hasLeftMatch = false;
        setErrorMessage(null);
      } catch {
        setErrorMessage("Unable to rejoin match");
      }
    };

    const handleVisibilityChange = () => {
      if (isMatchOver) {
        clearHiddenLeaveTimeout();
        return;
      }

      if (document.visibilityState === "visible") {
        clearHiddenLeaveTimeout();
        void rejoinAfterTemporaryLeave();
        return;
      }

      clearHiddenLeaveTimeout();
      hiddenLeaveTimeoutId = window.setTimeout(() => {
        void leaveMatchForAbandonment();
      }, HIDDEN_TAB_LEAVE_DELAY_MS);
    };

    const handlePageHide = () => {
      if (isMatchOver) return;
      void leaveMatchForAbandonment();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      clearHiddenLeaveTimeout();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [matchId, username, isExitingGame, isMatchOver, syncMatchState, setErrorMessage]);
}
