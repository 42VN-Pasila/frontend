import { describe, expect, it } from 'vitest';

import { ValidationField, validateFormInput } from './useFormInputValdiation';

describe('validateFormInput', () => {
  it('returns null for a valid email', () => {
    expect(validateFormInput(ValidationField.email, 'player@example.com')).toBeNull();
  });

  it('returns an error for an invalid email', () => {
    expect(validateFormInput(ValidationField.email, 'not-an-email')).toBe(
      'Email must be a valid address (ex: email@gmail.com)'
    );
  });

  it('returns an error for a weak password', () => {
    expect(validateFormInput(ValidationField.password, 'abc123')).toBe(
      'Password length must be 8-16'
    );
  });
});
