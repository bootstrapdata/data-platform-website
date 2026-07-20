import { BarChart3, Code2, Lock } from 'lucide-react';
import { useCases } from '@/content/site';

const ICON_MAP = { BarChart3, Code2, Lock } as const;
type IconName = keyof typeof ICON_MAP;

export default function UseCases() {
  const { heading, items } = useCases;

  return (
    <section className="section use-cases-section" id="use-cases" aria-labelledby="use-cases-heading">
      <div className="site-container">
        <header className="section-header reveal">
          <h2 id="use-cases-heading" className="section-heading section-heading--centered">
            {heading}
          </h2>
        </header>

        <div className="use-cases-grid reveal-group">
          {items.map((uc) => {
            const Icon = ICON_MAP[uc.icon as IconName];
            return (
              <article key={uc.id} className="use-case-card" data-spotlight>
                <div className="use-case-card__header">
                  <div className="use-case-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <p className="use-case-card__role">{uc.role}</p>
                </div>
                <h3 className="use-case-card__headline">{uc.headline}</h3>
                <ul className="use-case-card__outcomes" role="list">
                  {uc.outcomes.map((outcome) => (
                    <li key={outcome} className="use-case-card__outcome">
                      <span className="use-case-card__bullet" aria-hidden="true">
                        →
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
