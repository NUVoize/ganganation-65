// Input sanitization function
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// Validation functions
export const validateRating = (rating: number): boolean => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

export const validateNotes = (notes: string): boolean => {
  const sanitized = sanitizeInput(notes);
  return sanitized.length >= 5 && sanitized.length <= 2000;
};

export const validateConditions = (conditions: string): boolean => {
  if (!conditions) return true; // Optional field
  const sanitized = sanitizeInput(conditions);
  return sanitized.length <= 500;
};