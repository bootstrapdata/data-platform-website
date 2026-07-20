import { Button } from '@bootstrapdata/design-system/ui';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { site } from '@/content/site';

/**
 * M1 placeholder shell. Proves the toolchain end-to-end:
 * Vite + React 19 + Tailwind v4 + the private design system + lucide icons.
 * Real sections land in M2.
 */
export default function App() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-panel)] px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        <ShieldCheck className="size-3.5 text-primary" />
        {site.hero.eyebrow}
      </span>

      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {site.hero.headline.map((line, i) => (
          <span key={line} className={i === 1 ? 'block text-primary' : 'block'}>
            {line}
          </span>
        ))}
      </h1>

      <p className="max-w-xl text-lg text-muted-foreground text-pretty">{site.hero.subhead}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg">
          {site.hero.primary.label}
          <ArrowRight className="size-4" />
        </Button>
        <Button size="lg" variant="outline">
          {site.hero.secondary.label}
        </Button>
      </div>

      <p className="text-xs tracking-[0.15em] text-muted-foreground/70 uppercase">
        {site.hero.trust.join('  ·  ')}
      </p>
    </main>
  );
}
