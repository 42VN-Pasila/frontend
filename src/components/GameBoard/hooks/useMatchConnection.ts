import { useCallback, useEffect, useState } from 'react';

import type { MatchDto, MatchResultDto } from '@/gen/director';
import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  onSocketDisconnect,
  socket,
  socketJoinMatch
} from '@/shared/api/directorClient';
import { useGameSessionStore } from '@/shared/stores/useGameSessionStore';

export function useMatchConnection(matchId: string, username: string) {
  const syncMatchState = useGameSessionStore((s) => s.syncMatchState);
  const resetGameSession = useGameSessionStore((s) => s.resetGameSession);

  const [matchResult, setMatchResult] = useState<MatchResultDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [resetTurn, setResetTurn] = useState(false);

  const applyMatchState = useCallback(
    (match: MatchDto, result?: MatchResultDto) => {
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

    setErrorMessage(null);
    let active = true;

    const joinAndSync = async () => {
      try {
        const { match } = await socketJoinMatch({ matchId, username });
        if (!active) return;
        applyMatchState(match);
        setErrorMessage(null);
      } catch {
        if (!active) return;
        setErrorMessage('Unable to join match');
      }
    };

    const unsubMatchState = onMatchState((match, result) => {
      if (match.currentSeat?.username === username && match.currentSeat?.isTurn) {
        setResetTurn((prev) => !prev);
      }
      applyMatchState(match, result);
    });

    const unsubConnect = onSocketConnect(() => void joinAndSync());
    const unsubDisconnect = onSocketDisconnect(() => undefined);

    if (socket.connected) {
      void joinAndSync();
    } else {
      connectSocket();
    }

    return () => {
      active = false;
      unsubMatchState();
      unsubConnect();
      unsubDisconnect();
      disconnectSocket();
      resetGameSession();
    };
  }, [matchId, username, applyMatchState, resetGameSession]);

  return { matchResult, errorMessage, isMatchOver, setErrorMessage, resetTurn };
}
