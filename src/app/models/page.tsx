import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { models } from '@/data/models';
import { QUANTS, quantVramGb } from '@/lib/verdict';

export const metadata: Metadata = pageMetadata({
  title: 'LLM VRAM Requirements — Model-by-Model Database',
  description:
    'VRAM requirements for every major open-weight LLM: Llama, Mistral, Qwen, Gemma, Phi and more — Q4 and Q8 estimates, with per-hardware verdicts.',
  path: '/models',
});

export default function ModelsPage() {
  return (
    <>
      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        LLM VRAM requirements, model by model
      </h1>
      <p className="mt-3 max-w-2xl text-mist">
        Every model page shows the computed weight sizes at Q4 and Q8 and a verdict matrix
        against common hardware. Numbers are estimates from parameter counts — the formula is
        on every page.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <Link key={model.slug} href={`/models/${model.slug}`} className="card card-hover block p-5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-bold text-white">{model.name}</p>
              {model.moe ? (
                <span className="rounded-md bg-neon-cyan/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neon-cyan">
                  MoE
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-mist">
              {model.org} · {model.paramsB}B · {model.released}
            </p>
            <p className="mt-3 line-clamp-2 text-sm text-mist">{model.summary}</p>
            <p className="mt-4 text-xs font-bold text-neon-emerald">
              Q4 ≈ {quantVramGb(model.paramsB, QUANTS[0]!.bytesPerParam)} GB · Q8 ≈{' '}
              {quantVramGb(model.paramsB, QUANTS[1]!.bytesPerParam)} GB
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
