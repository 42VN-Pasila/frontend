export const getErrorMessage = (data: unknown): string => {
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object') {
    if ('error' in data && typeof data.error === 'string') return data.error;
    if ('message' in data && typeof data.message === 'string') return data.message;
  }
  return 'Unknown error';
};

export const handleConnectRoomError = (err: unknown): void => {
  if (err && typeof err === 'object' && 'status' in err && 'data' in err) {
    const status = (err as { status: number | string }).status;
    const message = getErrorMessage((err as { data: unknown }).data);

    if (status === 404) {
      console.error(`Room not found: ${message}`);
    } 
    else if (status === 400) {
      console.error(`Bad request: ${message}`);
    }
    else if (status === 500) {
      console.error(`Server error: ${message}`);
    } else {
      console.error(`Failed to connect (${String(status)}): ${message}`);
    }
  } else if (err instanceof Error) {
    console.error(`Network error: ${(err as Error).message}`);
  } else {
    console.error('Failed to connect to room', err);
  }
};
