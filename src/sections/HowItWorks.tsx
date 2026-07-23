import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Play, Pause } from 'lucide-react';
import { howItWorks } from '@/content/site';

const DWELL_MS = 6000;

export default function HowItWorks() {
  const { heading, subhead, stages } = howItWorks;
  const count = stages.length;

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false); // pointer over the stage card
  const [focused, setFocused] = useState(false); // keyboard focus within the player
  const [paused, setPaused] = useState(false); // explicit pause (touch / control)
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Respect reduced-motion (disables autoplay + page/fill animation)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Only autoplay while the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '0px 0px -20% 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = inView && !hovered && !focused && !reduced && !paused;

  function go(idx: number) {
    setActive(((idx % count) + count) % count);
  }

  function focusStep(idx: number) {
    const clamped = ((idx % count) + count) % count;
    stepsRef.current?.querySelector<HTMLButtonElement>(`#hiw-step-${stages[clamped].id}`)?.focus();
  }

  function onStepsKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      go(active + 1);
      focusStep(active + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      go(active - 1);
      focusStep(active - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0);
      focusStep(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(count - 1);
      focusStep(count - 1);
    }
  }

  const stage = stages[active];

  return (
    <section ref={sectionRef} className="section hiw-section" id="how-it-works" aria-labelledby="hiw-heading">
      <div className="site-container hiw-inner">
        <header className="section-header reveal">
          <h2 id="hiw-heading" className="section-heading section-heading--centered">
            {heading}
          </h2>
          <p className="section-intro">{subhead}</p>
        </header>

        <div
          className="hiw-player reveal"
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={() => setFocused(false)}
        >
          {/* Stage viewport — auto-advancing "page", constant height (stacked deck) */}
          <div
            className="hiw-stage"
            id="hiw-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`hiw-step-${stage.id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setPaused(true)}
          >
            <div className="hiw-stage__deck">
              {stages.map((s, i) => (
                <div
                  key={s.id}
                  className={`hiw-stage__page${i === active ? ' is-active' : ''}`}
                  aria-hidden={i !== active}
                >
                  <div className="hiw-stage__aside">
                    <span className="hiw-stage__index" aria-hidden="true">
                      {s.number}
                    </span>
                    <span className="hiw-stage__badge">{s.label}</span>
                    <span className="hiw-stage__count">
                      Step {i + 1} of {count}
                    </span>
                    <span className="hiw-stage__rule" aria-hidden="true" />
                    <span className="hiw-stage__hint" aria-hidden="true">
                      {i < count - 1 ? `Next · ${stages[i + 1].label}` : 'End of pipeline'}
                    </span>
                  </div>

                  <div className="hiw-stage__body">
                    <h3 className="hiw-stage__headline">{s.headline}</h3>
                    <p className="hiw-stage__lead">{s.body}</p>
                    <p className="hiw-stage__tech">{s.technical}</p>
                    <div className="hiw-stage__code">
                      <pre>
                        <code>{s.snippet}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Segmented progress stepper (also acts as tablist) */}
          <div
            ref={stepsRef}
            className="hiw-steps"
            role="tablist"
            aria-label="Pipeline stages"
            onKeyDown={onStepsKeyDown}
          >
            {stages.map((s, i) => (
              <button
                key={s.id}
                id={`hiw-step-${s.id}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="hiw-panel"
                tabIndex={i === active ? 0 : -1}
                className={`hiw-step${i === active ? ' hiw-step--active' : ''}${
                  i < active ? ' hiw-step--done' : ''
                }`}
                onClick={() => go(i)}
              >
                <span className="hiw-step__track" aria-hidden="true">
                  <span
                    className="hiw-step__fill"
                    style={
                      i === active
                        ? ({
                            animationDuration: `${DWELL_MS}ms`,
                            animationPlayState: autoplay ? 'running' : 'paused',
                          } as CSSProperties)
                        : undefined
                    }
                    onAnimationEnd={i === active ? () => go(active + 1) : undefined}
                  />
                </span>
                <span className="hiw-step__meta">
                  <span className="hiw-step__num">{s.number}</span>
                  <span className="hiw-step__label">{s.label}</span>
                </span>
              </button>
            ))}
          </div>

          {!reduced && (
            <div className="hiw-controls">
              <button
                type="button"
                className="hiw-playpause"
                aria-pressed={paused}
                aria-label={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}
                <span>{paused ? 'Play' : 'Pause'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
