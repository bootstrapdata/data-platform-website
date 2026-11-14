import { ArrowRight, Check, Info } from 'lucide-react';
import { reverseEtl } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';

export default function ReverseEtlSection() {
  const { eyebrow, status, heading, intro, flow, features, modes, modesLabel, note, cta } = reverseEtl;

  return (
    <section className="section retl-section" id="reverse-etl" aria-labelledby="retl-heading">
      <div className="site-container">
        <div className="retl-layout">
          <header className="retl-header reveal">
            <div className="retl-header__meta">
              <span className="section-eyebrow">{eyebrow}</span>
              <StatusBadge status={status} />
            </div>
            <h2 id="retl-heading" className="section-heading">
              {heading}
            </h2>
            <p className="retl-intro">{intro}</p>

            <div className="retl-flow" aria-label="Planned data flow">
              <div className="retl-flow__end">
                <span className="retl-flow__label">{flow.from.label}</span>
                <ul className="retl-flow__items" role="list">
                  {flow.from.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="retl-flow__via" aria-hidden="true">
                <span className="retl-flow__line" />
                <span className="retl-flow__badge">{flow.via}</span>
                <span className="retl-flow__line" />
              </div>
              <p className="sr-only">{`Synced through a ${flow.via.toLowerCase()} to:`}</p>
              <div className="retl-flow__end retl-flow__end--to">
                <span className="retl-flow__label">{flow.to.label}</span>
                <ul className="retl-flow__items" role="list">
                  {flow.to.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="retl-modes">
              <span className="retl-modes__label">{modesLabel}</span>
              <ul className="retl-modes__list" role="list">
                {modes.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="retl-cta">
              <a href={cta.href} className="btn btn--primary">
                {cta.label}
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
            <p className="retl-note">
              <Info aria-hidden="true" size={14} />
              <span>{note}</span>
            </p>
          </header>

          <ul className="retl-features reveal-group" role="list">
            {features.map((f) => (
              <li key={f.id} className="retl-feature" data-spotlight>
                <span className="retl-feature__icon" aria-hidden="true">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="retl-feature__title">{f.title}</h3>
                  <p className="retl-feature__text">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
