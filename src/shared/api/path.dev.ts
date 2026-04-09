export const toDevPath = (path: string) => {
  const input = path.trim();
  if (!input) {
    throw new Error('Path is required');
  }

  // Accept common typo like "http:localhost:5000" by normalizing to "http://localhost:5000".
  const normalized = input.replace(/^(https?):(?!\/\/)/i, '$1://');

  if (normalized.startsWith('/')) {
    return normalized.replace(/\/$/, '');
  }

  return new URL(normalized).toString().replace(/\/$/, '');
};
