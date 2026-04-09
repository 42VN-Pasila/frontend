<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import type { MatchDto, MatchResultDto } from "@/gen/director";
=======
import { useCallback, useEffect, useState } from 'react';

import type { MatchDto, MatchResultDto } from '@/gen/director';
>>>>>>> master
import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  onSocketDisconnect,
  socket,
<<<<<<< HEAD
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
=======
  socketJoinMatch
} from '@/shared/api/directorClient';
import { useGameSessionStore } from '@/shared/stores/useGameSessionStore';

export function useMatchConnection(matchId: string, username: string) {
  const syncMatchState = useGameSessionStore((s) => s.syncMatchState);
  const resetGameSession = useGameSessionStore((s) => s.resetGameSession);

  const [matchResult, setMatchResult] = useState<MatchResultDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMatchOver, setIsMatchOver] = useState(false);
>>>>>>> master
  const [resetTurn, setResetTurn] = useState(false);

  const applyMatchState = useCallback(
    (match: MatchDto, result?: MatchResultDto) => {
<<<<<<< HEAD
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
=======
      if (match.status === 'Completed') {
        setIsMatchOver(true);
        disconnectSocket();
        if (result) {
          setMatchResult(result);
          return;
        }

        resetGameSession();
        return;
      }

      syncMatchState(match, username);
    },
    [syncMatchState, resetGameSession, username]
  );

  useEffect(() => {
    if (!matchId || !username) return;
>>>>>>> master

    setErrorMessage(null);
    let active = true;

    const joinAndSync = async () => {
      try {
<<<<<<< HEAD
        const { match } = await socketJoinMatch({ matchId, userId });
=======
        const { match } = await socketJoinMatch({ matchId, username });
>>>>>>> master
        if (!active) return;
        applyMatchState(match);
        setErrorMessage(null);
      } catch {
        if (!active) return;
<<<<<<< HEAD
        setErrorMessage("Unable to join match");
      }
    };

    connectSocket();
    if (socket.connected) {
      void joinAndSync();
    }

    const unsubMatchState = onMatchState((match, result) => {
      if (match.currentSeat?.userId === userId && match.currentSeat?.isTurn) {
=======
        setErrorMessage('Unable to join match');
      }
    };

    const unsubMatchState = onMatchState((match, result) => {
      if (match.currentSeat?.username === username && match.currentSeat?.isTurn) {
>>>>>>> master
        setResetTurn((prev) => !prev);
      }
      applyMatchState(match, result);
    });

    const unsubConnect = onSocketConnect(() => void joinAndSync());
    const unsubDisconnect = onSocketDisconnect(() => undefined);

<<<<<<< HEAD
=======
    if (socket.connected) {
      void joinAndSync();
    } else {
      connectSocket();
    }

>>>>>>> master
    return () => {
      active = false;
      unsubMatchState();
      unsubConnect();
      unsubDisconnect();
      disconnectSocket();
<<<<<<< HEAD
    };
  }, [matchId, userId, applyMatchState]);

  return { matchResult, errorMessage, setErrorMessage, resetTurn };
=======
      resetGameSession();
    };
  }, [matchId, username, applyMatchState, resetGameSession]);

  return { matchResult, errorMessage, isMatchOver, setErrorMessage, resetTurn };
>>>>>>> master
}
