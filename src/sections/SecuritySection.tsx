import type { CSSProperties } from 'react';
import {
  Check,
  Database,
  History,
  KeyRound,
  Lock,
  Network,
  PackageCheck,
  ScrollText,
  Send,
  UserRound,
  Users,
  UserX,
} from 'lucide-react';
import { security, type SecurityIcon } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';
import FlowLink from '@/components/FlowLink';

const ICONS: Record<SecurityIcon, typeof KeyRound> = {
  KeyRound,
  Users,
  History,
  Lock,
  Network,
  PackageCheck,
};

const TARGET_ICONS = [Database, UserRound, Send];
const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

/** One privacy request fans out to every place a person's data lives, then is recorded. */
function PrivacyDiagram() {
  const d = security.privacy.diagram;
  const branchStart = (i: number) => 0.3 + i * 0.35;
  const logAt = branchStart(d.targets.length - 1) + 1.4;

  return (
    <figure className="dg privacy-dg" role="img" aria-label={d.label}>
      <div className="privacy-dg__flow">
        <div className="privacy-dg__req">
          <span className="privacy-dg__req-icon">
            <UserX size={20} strokeWidth={1.75} />
          </span>
          <span className="privacy-dg__req-text">
            <strong>{d.request}</strong>
            <span>{d.basis}</span>
          </span>
        </div>
        <FlowLink className="privacy-dg__stem" packets={[0.1]} />
        <ul className="privacy-dg__fan" role="list">
          {d.targets.map((t, i) => {
            const Icon = TARGET_ICONS[i % TARGET_ICONS.length];
            return (
              <li key={t} className="privacy-dg__branch">
                <FlowLink packets={[branchStart(i)]} />
                <span className="privacy-dg__target">
                  <Icon size={16} strokeWidth={1.75} />
                  <span>{t}</span>
                  <span className="privacy-dg__done" data-pop style={delay(branchStart(i) + 0.8)}>
                    <Check size={12} strokeWidth={3} />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="privacy-dg__log" data-pop style={delay(logAt)}>
        <ScrollText size={14} strokeWidth={2} />
        {d.log}
      </p>
    </figure>
  );
}

export default function SecuritySection() {
  const { eyebrow, heading, intro, items, privacy } = security;

  return (
    <section className="section security-section" id="security" aria-labelledby="security-heading">
      <div className="site-container">
        <header className="section-header section-header--split reveal">
          <div className="section-header__lead">
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 id="security-heading" className="section-heading">
              {heading}
            </h2>
          </div>
          <p className="section-intro">{intro}</p>
        </header>

        <ul className="security-grid reveal-group" role="list">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id} className="security-card" data-spotlight>
                <div className="security-card__top">
                  <span className="security-card__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  {item.status !== 'available' && <StatusBadge status={item.status} />}
                </div>
                <h3 className="security-card__title">{item.title}</h3>
                <p className="security-card__text">{item.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="privacy-panel reveal" role="group" aria-labelledby="privacy-title">
          <div className="privacy-panel__copy">
            <div className="privacy-panel__head">
              <h3 id="privacy-title" className="privacy-panel__title">
                {privacy.title}
              </h3>
              <StatusBadge status={privacy.status} />
            </div>
            <p className="privacy-panel__text">{privacy.text}</p>
            <div className="privacy-panel__regs">
              <span className="privacy-panel__regs-label" id="privacy-regs-label">
                {privacy.regulationsLabel}
              </span>
              <ul className="privacy-panel__chips" role="list" aria-labelledby="privacy-regs-label">
                {privacy.regulations.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <p className="privacy-panel__note">{privacy.note}</p>
          </div>
          <PrivacyDiagram />
        </div>
      </div>
    </section>
  );
}
