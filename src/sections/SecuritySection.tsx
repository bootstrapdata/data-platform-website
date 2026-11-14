import { History, KeyRound, Lock, Network, PackageCheck, Users } from 'lucide-react';
import { security, type SecurityIcon } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';

const ICONS: Record<SecurityIcon, typeof KeyRound> = {
  KeyRound,
  Users,
  History,
  Lock,
  Network,
  PackageCheck,
};

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

        <div className="privacy-panel reveal" aria-labelledby="privacy-title">
          <div className="privacy-panel__body">
            <div className="privacy-panel__head">
              <h3 id="privacy-title" className="privacy-panel__title">
                {privacy.title}
              </h3>
              <StatusBadge status={privacy.status} />
            </div>
            <p className="privacy-panel__text">{privacy.text}</p>
          </div>
          <div className="privacy-panel__regs">
            <span className="privacy-panel__regs-label" id="privacy-regs-label">
              Legal bases you can record
            </span>
            <ul className="privacy-panel__chips" role="list" aria-labelledby="privacy-regs-label">
              {privacy.regulations.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <p className="privacy-panel__note">{privacy.note}</p>
        </div>
      </div>
    </section>
  );
}
