import { useEffect } from 'react';

/**
 * Cursor-following spotlight glow for elements marked with `[data-spotlight]`.
 * Writes the pointer position into `--mx` / `--my` CSS custom properties and
 * toggles `.is-spotlit`. Disabled for coarse pointers and reduced-motion users.
 */
export function useSpotlight() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let raf = 0;
    let active: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest?.('[data-spotlight]') as HTMLElement | null;

      if (!el) {
        if (active) {
          active.classList.remove('is-spotlit');
          active = null;
        }
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${x - rect.left}px`);
        el.style.setProperty('--my', `${y - rect.top}px`);
        if (active && active !== el) active.classList.remove('is-spotlit');
        el.classList.add('is-spotlit');
        active = el;
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
