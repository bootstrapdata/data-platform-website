import { useEffect } from 'react';

/**
 * Reveals elements marked `.reveal` / `.reveal-group` as they scroll into view,
 * and starts `.dg` diagram animations once they are well into view.
 * Runs on the client only; server-rendered markup stays visible until this
 * upgrades it (the `.js` class on <html> supplies the initial hidden state).
 */
export function useReveal(): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .reveal-group'));
    const diagrams = Array.from(document.querySelectorAll<HTMLElement>('.dg'));
    if (els.length === 0 && diagrams.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      [...els, ...diagrams].forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const onIntersect: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    };

    // Threshold 0 so very tall groups (e.g. a long single-column grid) still reveal on short screens.
    const observer = new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    // Diagrams play once their top edge is well inside the viewport, whatever their height.
    const diagramObserver = new IntersectionObserver(onIntersect, {
      rootMargin: '0px 0px -30% 0px',
      threshold: 0,
    });

    els.forEach((el) => observer.observe(el));
    diagrams.forEach((el) => diagramObserver.observe(el));
    return () => {
      observer.disconnect();
      diagramObserver.disconnect();
    };
  }, []);
}
