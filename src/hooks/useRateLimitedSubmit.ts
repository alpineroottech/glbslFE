import { useState, useRef } from 'react';

interface RateLimitOptions {
  cooldownMs?: number;
}

interface RateLimitResult {
  canSubmit: () => boolean;
  isOnCooldown: boolean;
  markSubmitted: () => void;
}

/**
 * Prevents rapid form re-submissions by enforcing a cooldown period.
 * Default cooldown is 5 seconds after each successful submission.
 */
export const useRateLimitedSubmit = ({ cooldownMs = 5000 }: RateLimitOptions = {}): RateLimitResult => {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const lastSubmitRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSubmit = (): boolean => {
    const now = Date.now();
    return now - lastSubmitRef.current >= cooldownMs;
  };

  const markSubmitted = (): void => {
    lastSubmitRef.current = Date.now();
    setIsOnCooldown(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsOnCooldown(false);
    }, cooldownMs);
  };

  return { canSubmit, isOnCooldown, markSubmitted };
};
