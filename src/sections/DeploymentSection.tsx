import { useId, useState } from 'react';
import { ArrowRight, Check, Cloud, Server } from 'lucide-react';
import { deployment, demoHref, type DeploymentId } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';

const OPTION_ICONS = { Server, Cloud } as const;

type Answer = 'yes' | 'no';

function tally(answers: Record<string, Answer>) {
  const votes: Record<DeploymentId, string[]> = { byoc: [], cloud: [] };
  for (const q of deployment.chooser.questions) {
    const a = answers[q.id];
    if (a === 'yes') votes[q.yes].push(q.reason);
    else if (a === 'no' && 'no' in q && q.no && q.noReason) votes[q.no].push(q.noReason);
  }
  return votes;
}

function Chooser() {
  const { heading, intro, questions, empty, tie } = deployment.chooser;
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const baseId = useId();

  const votes = tally(answers);
  const answered = Object.keys(answers).length;
  const pick: DeploymentId | null =
    votes.byoc.length > votes.cloud.length ? 'byoc' : votes.cloud.length > votes.byoc.length ? 'cloud' : null;
  const picked = pick ? deployment.options.find((o) => o.id === pick) : undefined;

  return (
    <div className="deploy-chooser reveal">
      <div className="deploy-chooser__head">
        <h3 className="deploy-chooser__title">{heading}</h3>
        <p className="deploy-chooser__intro">{intro}</p>
      </div>

      <div className="deploy-chooser__questions">
        {questions.map((q, i) => (
          <fieldset key={q.id} className="deploy-q">
            <legend className="deploy-q__legend">
              <span className="deploy-q__num" aria-hidden="true">
                {i + 1}
              </span>
              {q.question}
            </legend>
            <div className="deploy-q__options">
              {(['yes', 'no'] as const).map((value) => {
                const id = `${baseId}-${q.id}-${value}`;
                return (
                  <label key={value} htmlFor={id} className="deploy-q__option">
                    <input
                      id={id}
                      type="radio"
                      name={`${baseId}-${q.id}`}
                      value={value}
                      checked={answers[q.id] === value}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
                    />
                    <span>{value === 'yes' ? 'Yes' : 'No'}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div
        className={`deploy-result${picked ? ` deploy-result--${picked.id}` : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {answered === 0 ? (
          <p className="deploy-result__empty">{empty}</p>
        ) : picked ? (
          <>
            <span className="deploy-result__label">Starting point</span>
            <p className="deploy-result__pick">{picked.name}</p>
            <p className="deploy-result__why">Because {votes[picked.id].join(', and ')}.</p>
          </>
        ) : (
          <p className="deploy-result__empty">{tie}</p>
        )}
        {answered > 0 && (
          <div className="deploy-result__actions">
            <a href={demoHref} className="btn btn--primary">
              Talk to us
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <button type="button" className="btn btn--ghost" onClick={() => setAnswers({})}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DeploymentSection() {
  const { eyebrow, heading, intro, options, billing } = deployment;

  return (
    <section className="section deploy-section" id="deployment" aria-labelledby="deploy-heading">
      <div className="site-container">
        <header className="section-header reveal">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 id="deploy-heading" className="section-heading section-heading--centered">
            {heading}
          </h2>
          <p className="section-intro">{intro}</p>
        </header>

        <div className="deploy-options reveal-group">
          {options.map((opt) => {
            const Icon = OPTION_ICONS[opt.icon];
            return (
              <article key={opt.id} className={`deploy-card deploy-card--${opt.id}`} data-spotlight>
                <div className="deploy-card__head">
                  <span className="deploy-card__icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="deploy-card__name">{opt.name}</h3>
                    <p className="deploy-card__tagline">{opt.tagline}</p>
                  </div>
                </div>
                <ul className="deploy-card__points" role="list">
                  {opt.points.map((pt) => (
                    <li key={pt}>
                      <Check aria-hidden="true" size={16} strokeWidth={2.5} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="deploy-card__best">{opt.bestFor}</p>
              </article>
            );
          })}
        </div>

        <div className="deploy-lower">
          <Chooser />

          <aside className="deploy-billing reveal" aria-labelledby="deploy-billing-title">
            <div className="deploy-billing__head">
              <h3 id="deploy-billing-title" className="deploy-billing__title">
                {billing.title}
              </h3>
              <StatusBadge status={billing.status} />
            </div>
            <p className="deploy-billing__text">{billing.text}</p>
            <ul className="deploy-billing__points" role="list">
              {billing.points.map((pt) => (
                <li key={pt}>
                  <Check aria-hidden="true" size={16} strokeWidth={2.5} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
