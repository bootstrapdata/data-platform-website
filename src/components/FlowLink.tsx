import type { CSSProperties } from 'react';

interface FlowLinkProps {
  /** Start delay (seconds) of each packet that travels along the link. */
  readonly packets?: readonly number[];
  readonly tone?: 'brand' | 'allow' | 'cyan' | 'muted';
  readonly direction?: 'forward' | 'up' | 'down';
  readonly label?: string;
  readonly className?: string;
}

/** A connector between diagram nodes. Packets animate once when the parent `.dg` is revealed. */
export default function FlowLink({
  packets = [],
  tone = 'brand',
  direction = 'forward',
  label,
  className,
}: FlowLinkProps) {
  const classes = [
    'dg-link',
    `dg-link--${tone}`,
    direction !== 'forward' && `dg-link--v dg-link--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-hidden="true">
      {packets.map((delay, i) => (
        <span key={i} className="dg-pk" style={{ '--d': `${delay}s` } as CSSProperties}>
          <i />
        </span>
      ))}
      {label && <span className="dg-link__label">{label}</span>}
    </span>
  );
}
