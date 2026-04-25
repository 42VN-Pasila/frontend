import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { queryClient } from '@/shared/api/queryClient';
import { useGameSessionStore } from '@/shared/stores/useGameSessionStore';
import { useRoomStore } from '@/shared/stores/useRoomStore';
import { useUserStore } from '@/shared/stores/useUserStore';

import { useAuth } from './useAuth';

export const useAppLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const resetUser = useUserStore((state) => state.resetUser);
  const resetRoom = useRoomStore((state) => state.resetRoom);
  const resetGameSession = useGameSessionStore((state) => state.resetGameSession);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutAndRedirect = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      resetGameSession();
      resetRoom();
      resetUser();
      queryClient.clear();
      localStorage.setItem('app-logout', Date.now().toString());
      navigate('/', { replace: true });
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout, navigate, resetGameSession, resetRoom, resetUser]);

  return {
    isLoggingOut,
    logoutAndRedirect
  };
};
