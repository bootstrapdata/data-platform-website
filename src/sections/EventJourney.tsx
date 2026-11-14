import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventJourney, verdictClass } from '@/content/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function EventJourney() {
  const root = useRef<HTMLDivElement>(null);
  const { eyebrow, heading, subhead, event, gates, verdict, destinations } = eventJourney;

  useGSAP(
    () => {
      const viz = root.current?.querySelector<HTMLElement>('.journey-viz');
      const pin = root.current?.querySelector<HTMLElement>('.journey-pin');
      if (!viz || !pin) return;

      // Desktop + motion only. Mobile / reduced-motion keep the readable stacked
      // layout with everything already in its resolved state.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(viz);
        const packet = q('.journey-packet')[0] as HTMLElement;
        const gateEls = q('.journey-gate') as unknown as HTMLElement[];
        const emailChip = q('.journey-chip[data-sensitive="true"]');
        const omitTag = q('.journey-omit-tag');
        const verdictBadge = q('.journey-verdict');
        const destsEl = q('.journey-dests');
        const destChips = q('.journey-dest');

        // Each gate's horizontal centre, measured live so the packet aligns
        // exactly — recomputed on every ScrollTrigger refresh (resize/zoom).
        const centreOf = (el: HTMLElement) => {
          const vr = viz.getBoundingClientRect();
          const r = el.getBoundingClientRect();
          return r.left - vr.left + r.width / 2;
        };
        // Clamp so the packet never overflows the container horizontally.
        const restX = (i: number) => {
          const w = packet.offsetWidth;
          const target = centreOf(gateEls[i]) - w / 2;
          return Math.min(Math.max(target, 0), viz.clientWidth - w);
        };

        // Light every gate up to whichever one the packet is nearest — fully
        // reversible as the user scrubs back and forth.
        const syncGates = () => {
          const c = (gsap.getProperty(packet, 'x') as number) + packet.offsetWidth / 2;
          let nearest = 0;
          let best = Infinity;
          gateEls.forEach((g, i) => {
            const d = Math.abs(centreOf(g) - c);
            if (d < best) {
              best = d;
              nearest = i;
            }
          });
          gateEls.forEach((g, i) => g.classList.toggle('is-active', i <= nearest));
        };

        gsap.set(packet, { x: restX(0), autoAlpha: 1 });
        gsap.set([omitTag, verdictBadge, destsEl], { autoAlpha: 0 });
        gsap.set(destChips, { autoAlpha: 0, y: 8 });
        syncGates();

        // Scrubbed timeline: the whole section is pinned (header + diagram stay
        // in view) and the story advances only as the user scrolls. Linear eases
        // keep motion tied to the wheel.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: syncGates,
            onRefresh: syncGates,
          },
        });

        // 2 — PII/SPII policy: minimize the sensitive field, stamp the verdict.
        tl.to(packet, { x: () => restX(1), duration: 1 });
        tl.to(emailChip, { opacity: 0.35, backgroundColor: 'var(--site-omit-dim)', duration: 0.4 }, '<0.3');
        tl.to(omitTag, { autoAlpha: 1, duration: 0.3 }, '<');
        tl.to(verdictBadge, { autoAlpha: 1, duration: 0.3 }, '<');

        // 3 — Consent.
        tl.to(packet, { x: () => restX(2), duration: 1 }, '>0.25');

        // 4 — Destinations: route the governed payload.
        tl.to(packet, { x: () => restX(3), duration: 1 }, '>0.25');
        tl.to(destsEl, { autoAlpha: 1, duration: 0.3 }, '<0.3');
        tl.to(destChips, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.4 }, '<');
        // Hold on the resolved state briefly before the section unpins.
        tl.to({}, { duration: 0.6 });

        return () => {
          gateEls.forEach((g) => g.classList.remove('is-active'));
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="section journey-section"
      id="event-journey"
      aria-labelledby="journey-heading"
    >
      <div className="journey-pin">
        <div className="site-container">
          <header className="section-header section-header--split reveal">
            <div className="section-header__lead">
              <span className="section-eyebrow">{eyebrow}</span>
              <h2 id="journey-heading" className="section-heading">
                {heading}
              </h2>
            </div>
            <p className="section-intro">{subhead}</p>
          </header>

          <div className="journey-stage">
            <div className="journey-viz">
              {/* Travelling event packet, riding the rail */}
              <div className="journey-lane">
                <div className="journey-rail" aria-hidden="true" />
                <div className="journey-packet">
                  <code className="journey-packet__label">{event.label}</code>
                  <ul className="journey-chips" role="list">
                    {event.fields.map((f) => (
                      <li
                        key={f.key}
                        className="journey-chip"
                        data-sensitive={f.sensitive ? 'true' : undefined}
                      >
                        <code>{f.key}</code>
                        <span>{f.value}</span>
                        {f.sensitive && <span className="journey-omit-tag">OMITTED</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gate cards — grid drives all alignment */}
              <ol className="journey-gates" role="list">
                {gates.map((g, i) => (
                  <li key={g.id} className="journey-gate" data-step={i + 1}>
                    <span className="journey-gate__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="journey-gate__label">{g.label}</span>
                    <span className="journey-gate__caption">{g.caption}</span>
                  </li>
                ))}
              </ol>

              {/* Outcome: verdict + routed destinations */}
              <div className="journey-outcome">
                <span className={`journey-verdict ${verdictClass(verdict)}`}>{verdict}</span>
                <ul className="journey-dests" aria-label="Routed to destinations" role="list">
                  {destinations.map((d) => (
                    <li key={d} className="journey-dest">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
