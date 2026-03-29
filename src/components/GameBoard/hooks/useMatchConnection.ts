import { useCallback, useEffect, useState } from "react";
import type { MatchDto, MatchResultDto } from "@/gen/director";
import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  onSocketDisconnect,
  socket,
  socketJoinMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";

export function useMatchConnection(
  matchId: string,
  userId: string,
  onAbandoned: () => void,
) {
  const syncMatchState = useGameSessionStore((s) => s.syncMatchState);

  const [matchResult, setMatchResult] = useState<MatchResultDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetTurn, setResetTurn] = useState(false);

  const applyMatchState = useCallback(
    (match: MatchDto, result?: MatchResultDto) => {
      syncMatchState(match, userId);

      if (match.status === "Completed" && result) {
        disconnectSocket();
        setMatchResult(result);
        if (result.endedReason === "Abandoned") {
          console.log("Abandoned???")
          onAbandoned();
        }
      }
    },
    [syncMatchState, userId, onAbandoned],
  );

  useEffect(() => {
    if (!matchId || !userId) return;

    setErrorMessage(null);
    let active = true;

    const joinAndSync = async () => {
      try {
        const { match } = await socketJoinMatch({ matchId, userId });
        if (!active) return;
        applyMatchState(match);
        setErrorMessage(null);
      } catch {
        if (!active) return;
        setErrorMessage("Unable to join match");
      }
    };

    connectSocket();
    if (socket.connected) {
      void joinAndSync();
    }

    const unsubMatchState = onMatchState((match, result) => {
      if (match.currentSeat?.userId === userId && match.currentSeat?.isTurn) {
        setResetTurn((prev) => !prev);
      }
      applyMatchState(match, result);
    });

    const unsubConnect = onSocketConnect(() => void joinAndSync());
    const unsubDisconnect = onSocketDisconnect(() => undefined);

    return () => {
      active = false;
      unsubMatchState();
      unsubConnect();
      unsubDisconnect();
      disconnectSocket();
    };
  }, [matchId, userId, applyMatchState]);

  return { matchResult, errorMessage, setErrorMessage, resetTurn };
}
