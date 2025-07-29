// Security utility functions

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:text\/html/gi, '') // Remove data URIs
    .trim();
};

/**
 * Validate and sanitize user input for tasting notes
 */
export const validateTastingInput = (input: string, maxLength: number = 2000): string => {
  const sanitized = sanitizeHtml(input);
  return sanitized.substring(0, maxLength);
};

/**
 * Validate rating values
 */
export const validateRating = (rating: number): boolean => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

/**
 * Generate secure random ID
 */
export const generateSecureId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
};

/**
 * Validate whiskey ID format
 */
export const isValidWhiskeyId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0 && /^[a-zA-Z0-9_-]+$/.test(id);
};

/**
 * Rate limiting for user actions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 10, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
}

export const tastingNoteRateLimit = new RateLimiter(20, 60000); // 20 notes per minute