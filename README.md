<p align="center">
  <img src="./public/favicon.svg" alt="Bootstrap Data" width="56" />
</p>

<h1 align="center">Bootstrap Data — Website</h1>

<p align="center">
  The public marketing website for <b>Bootstrap Data</b>, served at
  <a href="https://bootstrapdata.in">bootstrapdata.in</a>.
</p>

---

> **Public repository — marketing content only.** This repo contains no internal or
> confidential material (no architecture, service details, infrastructure, or secrets).
> All copy lives in [`src/content/site.ts`](./src/content/site.ts) for easy review.

## Tech stack

- **Vite + React 19 + TypeScript** — builds to fully static assets.
- **Tailwind CSS v4** + **`@bootstrapdata/design-system`** — the shared shadcn/ui
  (Radix) component library, brand theme, and assets, vendored as a tarball in
  [`vendor/`](./vendor).
- **lucide-react** icons; bespoke animated SVGs for the signature diagrams.

## Local development

The design system is vendored in `vendor/`, so no registry token is needed:

```bash
npm ci
npm run dev
```

To update the design system, pack the new version from the internal Gitea npm
registry (tailnet only), replace the tarball, and point `package.json` at it:

```bash
npm pack @bootstrapdata/design-system@<version> \
  --registry https://git.int.metapod.in/api/packages/bootstrapdata/npm/ \
  --pack-destination vendor/
npm install
```

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Lint with ESLint                     |

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which installs, builds, and publishes `dist/` to GitHub Pages. The custom domain is configured via
[`public/CNAME`](./public/CNAME).
