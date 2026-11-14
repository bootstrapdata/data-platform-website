import { ArrowRight, ChevronDown } from 'lucide-react';
import { hero } from '@/content/site';
import PolicyEvaluator from '@/evaluator/PolicyEvaluator';

/** Wraps `accent` in a gradient span, keeping the rest of the headline intact. */
function renderHeadline(text: string, accent: string) {
  const idx = text.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="hero-h1__accent">{text.slice(idx, idx + accent.length)}</span>
      {text.slice(idx + accent.length)}
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      {/* Strata decorative background */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-strata" aria-hidden="true">
        <div className="hero-strata__band" />
        <div className="hero-strata__band" />
        <div className="hero-strata__band" />
      </div>

      <div className="site-container hero-inner">
        {/* Left: copy */}
        <div className="hero-content">
          <span className="hero-eyebrow" aria-label="Category">
            {hero.eyebrow}
          </span>

          <h1 id="hero-heading" className="hero-h1">
            {renderHeadline(hero.headline, hero.accent)}
          </h1>

          <p className="hero-subhead">{hero.subhead}</p>
          <p className="hero-body">{hero.body}</p>

          <div className="hero-ctas">
            <a href={hero.primary.href} className="btn btn--primary btn--lg">
              {hero.primary.label}
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href={hero.secondary.href} className="btn btn--ghost btn--lg">
              {hero.secondary.label}
              <ChevronDown aria-hidden="true" size={16} />
            </a>
          </div>
        </div>

        {/* Right: policy evaluator */}
        <div className="hero-evaluator">
          <PolicyEvaluator />
        </div>
      </div>
    </section>
  );
}
