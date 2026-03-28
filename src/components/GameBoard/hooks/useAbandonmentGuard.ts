import { useEffect } from "react";
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
  userId: string,
  isExitingGame: boolean,
  setErrorMessage: (msg: string | null) => void,
) {
  const syncMatchState = useGameSessionStore((s) => s.syncMatchState);

  useEffect(() => {
    if (!matchId || !userId) return;

    let hiddenLeaveTimeoutId: number | null = null;
    let hasLeftMatch = false;

    const clearHiddenLeaveTimeout = () => {
      if (hiddenLeaveTimeoutId === null) return;
      window.clearTimeout(hiddenLeaveTimeoutId);
      hiddenLeaveTimeoutId = null;
    };

    const leaveMatchForAbandonment = async () => {
      if (hasLeftMatch) return;
      hasLeftMatch = true;
      clearHiddenLeaveTimeout();

      try {
        await socketLeaveMatch({ matchId, userId });
      } finally {
        disconnectSocket();
      }
    };

    const rejoinAfterTemporaryLeave = async () => {
      if (!hasLeftMatch || isExitingGame) return;

      try {
        connectSocket();
        const { match } = await socketJoinMatch({ matchId, userId });
        syncMatchState(match, userId);
        hasLeftMatch = false;
        setErrorMessage(null);
      } catch {
        setErrorMessage("Unable to rejoin match");
      }
    };

    const handleVisibilityChange = () => {
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
      void leaveMatchForAbandonment();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      clearHiddenLeaveTimeout();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [matchId, userId, isExitingGame, syncMatchState, setErrorMessage]);
}
