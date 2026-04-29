import { describe, expect, it } from 'vitest';

import { AVATAR_MAX_SIZE_BYTES, validateAvatarFile } from './avatarUpload';

describe('validateAvatarFile', () => {
  it('accepts valid png files under max size', () => {
    const file = new File(['image-bytes'], 'avatar.png', { type: 'image/png' });

    expect(validateAvatarFile(file)).toBeNull();
  });

  it('rejects unsupported mime types', () => {
    const file = new File(['gif-bytes'], 'avatar.gif', { type: 'image/gif' });

    expect(validateAvatarFile(file)).toBe('Only jpg, png, and webp files are allowed.');
  });

  it('rejects files larger than 5MB', () => {
    const file = new File([new Uint8Array(AVATAR_MAX_SIZE_BYTES + 1)], 'avatar.webp', {
      type: 'image/webp'
    });

    expect(validateAvatarFile(file)).toBe('File size must be 5MB or smaller.');
  });
});
