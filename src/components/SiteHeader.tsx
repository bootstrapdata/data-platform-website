import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { brand, nav } from '@/content/site';
import logoMark from '@bootstrapdata/design-system/assets/logo-mark.svg';
import ThemeToggle from '@/components/ThemeToggle';
import { useScrollSpy } from '@/lib/useScrollSpy';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const sectionIds = useMemo(() => nav.links.map((link) => link.href.replace(/^#/, '')), []);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} role="banner">
      <div className="site-container site-header__inner">
        {/* Logo */}
        <a href="/" className="site-logo" aria-label={`${brand.name} — home`}>
          <img src={logoMark} alt="" aria-hidden="true" width={32} height={32} className="site-logo__mark" />
          <span className="site-logo__name">{brand.name}</span>
        </a>

        {/* Desktop nav */}
        <nav className="site-nav" aria-label="Primary navigation">
          <ul className="site-nav__list" role="list">
            {nav.links.map((link) => {
              const isActive = link.href === `#${activeId}`;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="site-nav__link"
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA + actions */}
        <div className="site-header__actions">
          <ThemeToggle />
          <a href={nav.cta.href} className="btn btn--primary site-header__cta">
            {nav.cta.label}
          </a>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="site-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        className={`site-mobile-nav${menuOpen ? ' site-mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="site-mobile-nav__list" role="list">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="site-mobile-nav__link"
                  aria-current={link.href === `#${activeId}` ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={nav.cta.href} className="btn btn--primary site-mobile-nav__cta" onClick={closeMenu}>
                {nav.cta.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
