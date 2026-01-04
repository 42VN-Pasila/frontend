import axios from 'axios';

const decodedToken = (token: string): any | null => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

export const isExpired = (token: string): boolean => {
  const decoded = decodedToken(token);
  if (!decoded || !decoded.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
};

export const refreshSession = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || isExpired(refreshToken)) return null;

  try {
    const response = await axios.post('/api/auth/refresh', { refreshToken });

    const newAcessToken = response.data.accessToken;

    localStorage.setItem('accessToken', newAcessToken);

    return newAcessToken;
  } catch (error) {
    return null;
  }
};

export const logOut  = () =>
{
  localStorage.clear();
  return false;
}

export const sessionVerify = async(): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) return logOut();

  if (isExpired(accessToken))
  {
    const newAcessToken = await refreshSession();
    
    if (!newAcessToken) return logOut();

    localStorage.setItem('accessToken', newAcessToken);
  }

  return true;
}