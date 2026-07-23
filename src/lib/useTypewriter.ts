import { useEffect, useRef, useState } from 'react';

/**
 * Reveals `text` character-by-character. SSR-safe: renders the full string on
 * the server and on first paint (no hydration mismatch), then re-types on the
 * client. Honors prefers-reduced-motion by showing the full text instantly.
 */
export function useTypewriter(text: string): { shown: string; typing: boolean } {
  const [shown, setShown] = useState(text);
  const [typing, setTyping] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof requestAnimationFrame === 'undefined' || text.length === 0) {
      setShown(text);
      setTyping(false);
      return;
    }

    setTyping(true);
    const total = text.length;
    const durationMs = Math.min(850, Math.max(320, total * 3.5));
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(1, (t - start) / durationMs);
      setShown(text.slice(0, Math.floor(progress * total)));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setShown(text);
        setTyping(false);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text]);

  return { shown, typing };
}
