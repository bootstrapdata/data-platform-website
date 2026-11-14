import { useState, type CSSProperties } from 'react';
import { ArrowRight, Check, CheckCheck, Info, Minus, RotateCcw, ShieldCheck, Table2 } from 'lucide-react';
import { reverseEtl } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';
import FlowLink from '@/components/FlowLink';

const ROW_START = 0.3;
const ROW_STEP = 1;
const delay = (s: number) => ({ '--d': `${s.toFixed(2)}s` }) as CSSProperties;

/** Sample records pass through the governed sync one at a time; skipped ones never reach a tool. */
function SyncDiagram() {
  const { flow, diagram } = reverseEtl;
  const [run, setRun] = useState(0);
  const start = diagram.rows.map((_, i) => ROW_START + i * ROW_STEP);
  const done = start[start.length - 1] + 1.9;
  const destinations = flow.to.items.filter((item) => item !== 'and more');

  return (
    <figure className="dg retl-dg reveal" aria-labelledby="retl-dg-title">
      <div className="retl-dg__head">
        <h3 id="retl-dg-title" className="retl-dg__title">
          {diagram.title}
        </h3>
        <button type="button" className="retl-dg__replay" onClick={() => setRun((n) => n + 1)}>
          <RotateCcw aria-hidden="true" size={14} />
          {diagram.replay}
        </button>
      </div>

      <div key={run} className="retl-dg__stage dg-stack">
        <div className="retl-dg__model">
          <div className="retl-dg__model-head">
            <Table2 aria-hidden="true" size={16} strokeWidth={1.75} />
            <span>{diagram.modelLabel}</span>
            <code>{diagram.model}</code>
          </div>
          <ol className="retl-dg__rows">
            {diagram.rows.map((row, i) => (
              <li key={row.id} className={`retl-row retl-row--${row.outcome}`}>
                <span
                  className="retl-row__scan"
                  data-flash
                  style={delay(start[i] - 0.1)}
                  aria-hidden="true"
                />
                <code className="retl-row__id">{row.id}</code>
                <span className="retl-row__trait">{row.trait}</span>
                <span className="retl-row__out" data-pop style={delay(start[i] + 0.95)}>
                  {row.outcome === 'synced' ? (
                    <Check aria-hidden="true" size={12} strokeWidth={3} />
                  ) : (
                    <Minus aria-hidden="true" size={12} strokeWidth={3} />
                  )}
                  <span className="sr-only">{row.outcome === 'synced' ? 'Synced: ' : 'Skipped: '}</span>
                  {row.note}
                </span>
              </li>
            ))}
          </ol>
          <p className="retl-dg__src">From {flow.from.items.join(', ')}</p>
        </div>

        <FlowLink packets={start} />

        <div className="retl-dg__gate">
          {diagram.rows.map((row, i) => (
            <span
              key={row.id}
              className={`retl-dg__flash retl-dg__flash--${row.outcome}`}
              data-flash
              style={delay(start[i] + 0.75)}
              aria-hidden="true"
            />
          ))}
          <span className="retl-dg__gate-icon" aria-hidden="true">
            <ShieldCheck size={20} strokeWidth={1.75} />
          </span>
          <span className="retl-dg__gate-title">{flow.via}</span>
          <ul className="retl-dg__checks" role="list">
            {diagram.checks.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <FlowLink
          tone="allow"
          packets={diagram.rows.flatMap((row, i) => (row.outcome === 'synced' ? [start[i] + 1] : []))}
        />

        <div className="retl-dg__dests">
          <span className="retl-dg__label">{flow.to.label}</span>
          <ul className="retl-dg__tools" role="list">
            {destinations.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="retl-dg__summary" data-pop style={delay(done)}>
            <CheckCheck aria-hidden="true" size={14} strokeWidth={2.5} />
            {diagram.summary}
          </p>
        </div>
      </div>

      <figcaption className="retl-dg__caption">{diagram.caption}</figcaption>
    </figure>
  );
}

export default function ReverseEtlSection() {
  const { eyebrow, status, heading, intro, features, modes, modesLabel, note, cta } = reverseEtl;

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

        <SyncDiagram />
      </div>
    </section>
  );
}
