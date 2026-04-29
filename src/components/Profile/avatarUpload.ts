export const AVATAR_MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_AVATAR_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

export const toAvatarContentType = (mimeType: string): string | null => {
  if (ALLOWED_AVATAR_MIME_TYPES.has(mimeType)) {
    return mimeType;
  }

  return null;
};

export const validateAvatarFile = (file: File): string | null => {
  if (!toAvatarContentType(file.type)) {
    return 'Only jpg, png, and webp files are allowed.';
  }

  if (file.size > AVATAR_MAX_SIZE_BYTES) {
    return 'File size must be 5MB or smaller.';
  }

  return null;
};
