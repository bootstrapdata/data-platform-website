import { brand, footer } from '@/content/site';
import logoMark from '@bootstrapdata/design-system/assets/logo-mark.svg';

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-container site-footer__inner">
        {/* Brand */}
        <div className="site-footer__brand">
          <a href="/" className="site-logo" aria-label={`${brand.name} — home`}>
            <img
              src={logoMark}
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="site-logo__mark"
            />
            <span className="site-logo__name">{brand.name}</span>
          </a>
          <p className="site-footer__tagline">{footer.tagline}</p>
          <p className="site-footer__disclaimer">{footer.disclaimer}</p>
        </div>

        {/* Links */}
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {footer.groups.map((group) => (
            <div key={group.label} className="site-footer__group">
              <p className="site-footer__group-label">{group.label}</p>
              <ul className="site-footer__links" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="site-footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bar">
        <div className="site-container site-footer__bar-inner">
          {/* The year is computed at load, so a page built last year may differ on hydration. */}
          <p className="site-footer__legal" suppressHydrationWarning>
            {footer.legal}
          </p>
          <a href={`mailto:${brand.email}`} className="site-footer__contact">
            {brand.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
