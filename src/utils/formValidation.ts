/**
 * Shared client-side form validation helpers.
 * Returns an error message string if invalid, or null if valid.
 */

export const validateName = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return 'Name is required';
  if (trimmed.length < 2) return 'Name must be at least 2 characters';
  if (trimmed.length > 100) return 'Name cannot exceed 100 characters';
  return null;
};

export const validateEmail = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return 'Please enter a valid email address';
  if (trimmed.length > 100) return 'Email cannot exceed 100 characters';
  return null;
};

export const validatePhone = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return 'Phone number is required';
  // Allow digits, spaces, +, -, (, ) — common phone formats
  const phoneRegex = /^[0-9+\-().\s]{6,20}$/;
  if (!phoneRegex.test(trimmed)) return 'Please enter a valid phone number (6–20 digits)';
  return null;
};

export const validateRequired = (value: string, label: string, maxLength = 2000): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length > maxLength) return `${label} cannot exceed ${maxLength} characters`;
  return null;
};

export const validatePositiveNumber = (value: string, label: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  const num = Number(trimmed);
  if (isNaN(num) || num <= 0) return `${label} must be a positive number`;
  return null;
};

export type FormErrors = Record<string, string>;

/** Returns true if there are no error messages in the errors object */
export const isFormValid = (errors: FormErrors): boolean =>
  Object.values(errors).every((msg) => !msg);
