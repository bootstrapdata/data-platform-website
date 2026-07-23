import { GitBranch, ShieldCheck, Waypoints, History, type LucideIcon } from 'lucide-react';
import { trustStrip } from '@/content/site';

const icons: Record<string, LucideIcon> = { GitBranch, ShieldCheck, Waypoints, History };

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Trust foundations">
      <div className="site-container">
        <p className="trust-strip__label">{trustStrip.label}</p>
        <ul className="trust-strip__grid reveal-group" role="list">
          {trustStrip.pillars.map((pillar) => {
            const Icon = icons[pillar.icon];
            return (
              <li key={pillar.id} className="trust-pillar">
                <span className="trust-pillar__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="trust-pillar__body">
                  <span className="trust-pillar__title">{pillar.title}</span>
                  <span className="trust-pillar__text">{pillar.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
