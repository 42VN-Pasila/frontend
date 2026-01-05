import axios from 'axios';

export const isExpired = (accessTokenExpiryDate: string): boolean => {
  const expiryDate = new Date(accessTokenExpiryDate);
  const now = Date.now();
  return expiryDate.getTime() < now;
};

export const refreshSession = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) return null;

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
  const accessTokenExpiryDate = localStorage.getItem('accessTokenExpiryDate');

  if (!accessTokenExpiryDate) return logOut();

  if (isExpired(accessTokenExpiryDate))
  {
    const newAcessToken = await refreshSession();
    
    if (!newAcessToken) return logOut();

    localStorage.setItem('accessToken', newAcessToken);
  }

  return true;
}