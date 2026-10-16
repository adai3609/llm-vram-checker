import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, MemoryStick, Sigma } from 'lucide-react';
import { CheckerTool } from '@/components/checker/CheckerTool';
import { AdSlot } from '@/components/site/AdSlot';
import { FaqSection } from '@/components/seo/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { devices } from '@/data/hardware';
import { homeFaqs } from '@/data/faqs';
import { models } from '@/data/models';
import { pageMetadata, siteConfig } from '@/lib/seo';
import { QUANTS, quantVramGb } from '@/lib/verdict';

export const metadata: Metadata = pageMetadata({
  title: 'Can Your GPU Run Local LLMs? — VRAM Checker & Requirements',
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: siteConfig.url,
        }}
      />

      <section className="py-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-neon-emerald">
          Free · No signup · Transparent math
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          Can your GPU run <span className="text-mint">local LLMs</span>?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-mist">
          Pick a model and your hardware — get an honest verdict based on a published formula,
          not marketing numbers. Llama, Mistral, Qwen, Gemma and more, checked against RTX
          cards, Macs and CPU-only setups.
        </p>
      </section>

      <CheckerTool models={models} devices={devices} />

      <AdSlot className="mt-8" />

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-white">How the math works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-6">
            <Sigma className="h-6 w-6 text-neon-emerald" aria-hidden />
            <h3 className="mt-3 font-bold text-white">1. Weight size</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              A model’s weights take roughly{' '}
              <strong className="text-white">parameters × bytes-per-weight</strong> of memory:
              Q4 quantization ≈ 0.58 bytes per parameter, Q8 ≈ 1.06. An 8B model needs
              ~{quantVramGb(8, QUANTS[0]!.bytesPerParam)} GB at Q4.
            </p>
          </div>
          <div className="card p-6">
            <MemoryStick className="h-6 w-6 text-neon-emerald" aria-hidden />
            <h3 className="mt-3 font-bold text-white">2. Usable memory</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Discrete GPUs offer their full VRAM. Apple unified memory realistically yields
              ~70% for weights; CPU-only setups get ~80% of system RAM after the OS takes its
              share.
            </p>
          </div>
          <div className="card p-6">
            <Cpu className="h-6 w-6 text-neon-emerald" aria-hidden />
            <h3 className="mt-3 font-bold text-white">3. Verdict rule</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              <strong className="text-white">Usable ≥ weights + 2 GB</strong> → runs well
              (the 2 GB covers context and buffers). Between the two → tight fit. Below →
              too big.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">Popular models</h2>
          <Link
            href="/models"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-neon-emerald hover:underline"
          >
            All {models.length} models
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.slice(0, 6).map((model) => (
            <Link key={model.slug} href={`/models/${model.slug}`} className="card card-hover block p-5">
              <p className="font-bold text-white">{model.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-mist">
                {model.org} · {model.paramsB}B params
              </p>
              <p className="mt-3 line-clamp-2 text-sm text-mist">{model.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <FaqSection items={homeFaqs} />
    </>
  );
}
