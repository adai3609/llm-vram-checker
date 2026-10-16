import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ModelMatrixTable } from '@/components/checker/MatrixTables';
import { AdSlot } from '@/components/site/AdSlot';
import { devices } from '@/data/hardware';
import { models } from '@/data/models';
import { pageMetadata } from '@/lib/seo';
import { QUANTS, quantVramGb } from '@/lib/verdict';

interface ModelPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return {};
  return pageMetadata({
    title: `Run ${model.name} Locally — VRAM Requirements by Quantization`,
    description: `How much VRAM does ${model.name} (${model.paramsB}B) need? Q4 ≈ ${quantVramGb(model.paramsB, QUANTS[0]!.bytesPerParam)} GB, Q8 ≈ ${quantVramGb(model.paramsB, QUANTS[1]!.bytesPerParam)} GB — see verdicts for RTX cards, Macs and CPU-only setups.`,
    path: `/models/${model.slug}`,
  });
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Models', href: '/models' },
          { name: model.name, href: `/models/${model.slug}` },
        ]}
      />

      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        Running {model.name} locally
      </h1>
      <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-mist">
        {model.org} · {model.paramsB}B parameters · released {model.released}
        {model.moe ? ' · mixture-of-experts' : ''}
      </p>

      <p className="mt-6 max-w-3xl leading-relaxed text-mist">{model.summary}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {QUANTS.map((q) => (
          <div key={q.id} className="card p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-neon-emerald">
              {q.label}
            </p>
            <p className="mt-2 text-3xl font-black tabular-nums text-white">
              ≈ {quantVramGb(model.paramsB, q.bytesPerParam)} GB
            </p>
            <p className="mt-1 text-sm text-mist">weights only, plus 2 GB context headroom rule</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-white">
        Verdicts by hardware
      </h2>
      <div className="mt-5">
        <ModelMatrixTable model={model} devices={devices} />
      </div>

      <AdSlot className="mt-10" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-white">Notes</h2>
        <div className="prose-site mt-4 text-sm">
          <p>
            The table uses a transparent estimate:{' '}
            <strong className="text-white">
              {model.paramsB}B × bytes-per-weight (Q4 0.58, Q8 1.06)
            </strong>
            , then compares against usable memory — full VRAM on discrete GPUs, ~70% on Apple
            unified memory, ~80% on CPU-only system RAM. A verdict needs the weights plus 2 GB
            of headroom for context and runtime buffers.
          </p>
          {model.moe ? (
            <p>
              {model.name} is a mixture-of-experts model: only a fraction of parameters activate
              per token, which helps speed — but all {model.paramsB}B of weights still must fit
              in memory, so capacity requirements follow the total size.
            </p>
          ) : null}
          <p>
            Longer context windows consume additional memory beyond the weights. If you run
            32k+ token contexts, treat “Tight fit” as “no” and give “Runs well” setups extra
            headroom.
          </p>
        </div>
      </section>
    </>
  );
}
