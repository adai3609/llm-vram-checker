# LLM VRAM Checker

Can your GPU run local LLMs? A transparent, formula-based VRAM checker and
model × hardware verdict database. Static Next.js, English content.

## Stack

- Next.js 15 (App Router, `output: 'export'`)
- TypeScript strict (`noUncheckedIndexedAccess`)
- Tailwind CSS 3.4, lucide-react

## Run

```bash
pnpm install
pnpm build      # static export to ./out
pnpm dev        # local dev
```

## Deploy (Vercel)

1. Push to GitHub, import in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain. Rebuild.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/lib/verdict.ts` | THE core: quant sizes, usable-memory rules, verdict logic |
| `src/data/models.ts` | 12 open-weight models (public parameter counts) |
| `src/data/hardware.ts` | 11 reference devices (GPU / Mac / CPU) |
| `src/components/checker/CheckerTool.tsx` | Interactive client-side checker |
| `src/components/checker/MatrixTables.tsx` | Programmatic verdict matrices |
| `src/components/site/AdSlot.tsx` | AdSense placeholder — swap after approval |
| `src/app/sitemap.ts` | 27 routes incl. all generated detail pages |

## Extending the database

- New model: append to `src/data/models.ts` — detail page, matrix rows and
  sitemap entry generate automatically.
- New hardware: append to `src/data/hardware.ts` — same effect.

## Methodology (the trust differentiator)

- Weight size = parameters × bytes-per-weight (Q4 ≈ 0.58, Q8 ≈ 1.06).
- Usable memory: full VRAM (discrete GPU), 70% (Apple unified), 80% (system RAM).
- Verdict: usable ≥ weights + 2 GB → "Runs well"; ≥ weights → "Tight fit"; else "Too big".
- Estimates, never benchmarks — the formula is published on every page.
