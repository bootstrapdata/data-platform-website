import {
  Activity,
  Bot,
  Check,
  Database,
  FileCode2,
  Fingerprint,
  Radio,
  Send,
  ShieldCheck,
  UserX,
  Wand2,
} from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';
import type { IconType } from 'react-icons';
import {
  SiAndroid,
  SiApple,
  SiJavascript,
  SiKotlin,
  SiPython,
  SiSwift,
  SiTypescript,
  SiUnity,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { platform, type ModuleIcon } from '@/content/site';
import StatusBadge from '@/components/StatusBadge';
import logoMark from '@bootstrapdata/design-system/assets/logo-mark.svg';

const ICON_MAP: Record<ModuleIcon, typeof Radio> = {
  Radio,
  ShieldCheck,
  Wand2,
  Database,
  Fingerprint,
  Send,
  Activity,
  UserX,
  Bot,
  FileCode2,
};

// Brand logo + official-ish colour for each source / client technology.
// Colours are chosen to read well against both the dark and light themes.
const TECH: Record<string, { Icon: IconType; color: string }> = {
  Android: { Icon: SiAndroid, color: '#3DDC84' },
  iOS: { Icon: SiApple, color: '#A6ADB8' },
  JavaScript: { Icon: SiJavascript, color: '#EAB308' },
  Unity: { Icon: SiUnity, color: '#9CA3AF' },
  'Direct API': { Icon: TbApi, color: 'var(--site-brand)' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  Java: { Icon: FaJava, color: '#E76F00' },
  Kotlin: { Icon: SiKotlin, color: '#7F52FF' },
  Swift: { Icon: SiSwift, color: '#F05138' },
  Python: { Icon: SiPython, color: '#3776AB' },
};

function TechChip({
  item,
  variant,
  chipRef,
}: {
  item: string;
  variant?: 'right';
  chipRef?: (el: HTMLLIElement | null) => void;
}) {
  const tech = TECH[item];
  const Icon = tech?.Icon;
  return (
    <li
      ref={chipRef}
      className={`platform-io__chip${variant === 'right' ? ' platform-io__chip--right' : ''}`}
      style={tech ? ({ '--chip-color': tech.color } as CSSProperties) : undefined}
    >
      {Icon ? (
        <span className="platform-io__ico" aria-hidden="true">
          <Icon />
        </span>
      ) : null}
      {item}
    </li>
  );
}

/**
 * Hub diagram, read left -> right as Generated clients -> Bootstrap contract ->
 * Source types. Connector paths are drawn (client-side) from every chip to the
 * central node so the association is explicit and symmetric on both sides.
 */
function PlatformFlow({
  sources,
  clients,
}: {
  sources: { label: string; items: readonly string[] };
  clients: { label: string; items: readonly string[] };
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rightRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [leftPaths, setLeftPaths] = useState<string[]>([]);
  const [rightPaths, setRightPaths] = useState<string[]>([]);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 860px)');
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const node = nodeRef.current;
    if (!wrap || !node) return;

    if (!wide) {
      setLeftPaths([]);
      setRightPaths([]);
      return;
    }

    const compute = () => {
      const wr = wrap.getBoundingClientRect();
      const nr = node.getBoundingClientRect();
      const leftAnchor = { x: nr.left - wr.left, y: nr.top - wr.top + nr.height / 2 };
      const rightAnchor = { x: nr.right - wr.left, y: nr.top - wr.top + nr.height / 2 };

      // Both sides drawn left -> right so a single flow animation reads continuously.
      const curve = (from: { x: number; y: number }, to: { x: number; y: number }): string => {
        const dx = Math.max(28, Math.abs(to.x - from.x) * 0.5);
        return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y} ${to.x - dx} ${to.y} ${to.x} ${to.y}`;
      };

      const lefts: string[] = [];
      leftRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        lefts.push(curve({ x: r.right - wr.left, y: r.top - wr.top + r.height / 2 }, leftAnchor));
      });

      const rights: string[] = [];
      rightRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        rights.push(curve(rightAnchor, { x: r.left - wr.left, y: r.top - wr.top + r.height / 2 }));
      });

      setBox({ w: wr.width, h: wr.height });
      setLeftPaths(lefts);
      setRightPaths(rights);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    if (document.fonts?.ready) document.fonts.ready.then(compute).catch(() => {});
    return () => ro.disconnect();
  }, [wide, sources, clients]);

  const hasLinks = wide && (leftPaths.length > 0 || rightPaths.length > 0);

  return (
    <div ref={wrapRef} className="platform-io reveal">
      {hasLinks ? (
        <svg
          className="platform-io__links"
          viewBox={`0 0 ${box.w} ${box.h}`}
          width={box.w}
          height={box.h}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {leftPaths.map((d, i) => (
            <path key={`l-${i}`} className="platform-io__link" d={d} />
          ))}
          {rightPaths.map((d, i) => (
            <path key={`r-${i}`} className="platform-io__link" d={d} />
          ))}
        </svg>
      ) : null}

      <div className="platform-io__group">
        <span className="platform-io__label">{clients.label}</span>
        <span className="platform-io__cap">Generated from that contract</span>
        <ul className="platform-io__list" role="list" aria-label={clients.label}>
          {clients.items.map((item, i) => (
            <TechChip
              key={item}
              item={item}
              chipRef={(el) => {
                leftRefs.current[i] = el;
              }}
            />
          ))}
        </ul>
      </div>

      <div className="platform-io__hub">
        <div ref={nodeRef} className="platform-io__node">
          <img src={logoMark} alt="" width={30} height={30} />
        </div>
        <span className="platform-io__hublabel">Bootstrap Contract</span>
        <span className="platform-io__hubcap">Governed Schema · One Source of Truth</span>
      </div>

      <div className="platform-io__group platform-io__group--out">
        <span className="platform-io__label">{sources.label}</span>
        <span className="platform-io__cap">Collected into one contract</span>
        <ul className="platform-io__list" role="list" aria-label={sources.label}>
          {sources.items.map((item, i) => (
            <TechChip
              key={item}
              item={item}
              variant="right"
              chipRef={(el) => {
                rightRefs.current[i] = el;
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PlatformSection() {
  const { eyebrow, heading, subhead, modules, sources, clients } = platform;

  return (
    <section className="section platform-section" id="platform" aria-labelledby="platform-heading">
      <div className="site-container">
        <header className="section-header reveal">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 id="platform-heading" className="section-heading section-heading--centered">
            {heading}
          </h2>
          <p className="section-intro">{subhead}</p>
        </header>

        <ul className="module-grid reveal-group" role="list">
          {modules.map((mod) => {
            const Icon = ICON_MAP[mod.icon];
            return (
              <li key={mod.id} className="module-card" data-spotlight>
                <div className="module-card__top">
                  <span className="module-card__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="module-card__stage">{mod.stage}</span>
                  <StatusBadge status={mod.status} />
                </div>
                <h3 className="module-card__title">{mod.title}</h3>
                <p className="module-card__summary">{mod.summary}</p>
                <ul className="module-card__points" role="list">
                  {mod.points.map((pt) => (
                    <li key={pt}>
                      <Check aria-hidden="true" size={14} strokeWidth={2.5} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        {/* Hub: generated clients <- one contract <- every source */}
        <PlatformFlow sources={sources} clients={clients} />
      </div>
    </section>
  );
}
