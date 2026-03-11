export const getErrorMessage = (data: unknown): string => {
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object') {
    if ('error' in data && typeof data.error === 'string') return data.error;
    if ('message' in data && typeof data.message === 'string') return data.message;
  }
  return 'Unknown error';
};

export const handleConnectRoomError = (err: unknown): string => {
  if (err && typeof err === 'object' && 'status' in err && 'data' in err) {
    const status = (err as { status: number | string }).status;
    const message = getErrorMessage((err as { data: unknown }).data);
    if (status === 404) {
      return (`Not found: ${message}`);
    } 
    else if (status === 400) {
      return (`Bad request: ${message}`);
    }
    else if (status === 500) {
      return (`Server error: ${message}`);
    } else if (status === 409) {
      return (`Failed to connect: ${message}`);
    }
  }
  
  if (err instanceof Error) {
    return (`Network error: ${(err as Error).message}`);
  }
  
  return ('Failed to connect to room'); // 500
};