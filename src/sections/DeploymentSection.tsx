import { useId, useState } from 'react';
import {
  AppWindow,
  ArrowRight,
  Check,
  Cloud,
  Receipt,
  Server,
  Warehouse,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import logoMark from '@bootstrapdata/design-system/assets/logo-mark.svg';
import { deployment, demoHref, type DeploymentId } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';
import FlowLink from '@/components/FlowLink';

const OPTION_ICONS = { Server, Cloud } as const;

type Answer = 'yes' | 'no';

function Unit({
  icon: Icon,
  label,
  variant,
}: {
  icon?: LucideIcon;
  label: string;
  variant?: 'brand' | 'ghost';
}) {
  return (
    <div className={`dg-unit${variant ? ` dg-unit--${variant}` : ''}`}>
      <span className="dg-unit__icon">
        {Icon ? <Icon size={20} strokeWidth={1.75} /> : <img src={logoMark} alt="" width={24} height={24} />}
      </span>
      <span className="dg-unit__label">{label}</span>
    </div>
  );
}

/** Where each deployment option runs, and what crosses the account boundary. */
function DeploymentVisual({ id }: { id: DeploymentId }) {
  const v = deployment.visual;
  const copy = v[id];

  if (id === 'byoc') {
    return (
      <figure className="dg deploy-visual" role="img" aria-label={copy.label}>
        <div className="deploy-visual__top">
          <Unit icon={Receipt} label={copy.external} variant="ghost" />
          <FlowLink
            direction="up"
            tone="muted"
            label={copy.link}
            packets={[2.8]}
            className="deploy-visual__uplink"
          />
        </div>
        <div className="dg-boundary">
          <span className="dg-boundary__label">{copy.boundary}</span>
          <div className="dg-flow dg-stack">
            <Unit icon={AppWindow} label={v.apps} />
            <FlowLink packets={[0.2, 0.9, 1.6]} />
            <Unit label={v.platform} variant="brand" />
            <FlowLink packets={[0.75, 1.45, 2.15]} />
            <Unit icon={Warehouse} label={v.destinations} />
          </div>
          <p className="dg-boundary__foot">{copy.foot}</p>
        </div>
      </figure>
    );
  }

  return (
    <figure className="dg deploy-visual" role="img" aria-label={copy.label}>
      <div className="deploy-visual__top deploy-visual__top--ops">
        <Unit icon={Wrench} label={copy.external} variant="ghost" />
        <FlowLink direction="down" label={copy.link} packets={[0.2]} className="deploy-visual__downlink" />
      </div>
      <div className="dg-flow dg-stack deploy-visual__row">
        <Unit icon={AppWindow} label={v.apps} />
        <FlowLink packets={[0.7, 1.4, 2.1]} />
        <div className="dg-boundary dg-boundary--brand deploy-visual__managed">
          <span className="dg-boundary__label">{copy.boundary}</span>
          <Unit label={v.platform} variant="brand" />
          <span className="deploy-visual__ops-note">{copy.link}</span>
        </div>
        <FlowLink packets={[1.25, 1.95, 2.65]} />
        <Unit icon={Warehouse} label={v.destinations} />
      </div>
      <p className="dg-boundary__foot">{copy.foot}</p>
    </figure>
  );
}

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
  const { heading, intro, questions, empty, incomplete, tie } = deployment.chooser;
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const baseId = useId();

  const votes = tally(answers);
  const answered = Object.keys(answers).length;
  const complete = answered === questions.length;
  const majority: DeploymentId | null =
    votes.byoc.length > votes.cloud.length ? 'byoc' : votes.cloud.length > votes.byoc.length ? 'cloud' : null;
  // A hard requirement (e.g. data must stay in your account) overrides the other answers.
  const required = questions.find((q) => 'decisive' in q && q.decisive && answers[q.id] === 'yes');
  const pick: DeploymentId | null = required ? required.yes : complete ? majority : null;
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
          <p className="deploy-result__empty">{complete ? tie : incomplete}</p>
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
                <DeploymentVisual id={opt.id} />
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
