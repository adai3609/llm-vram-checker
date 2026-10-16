'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { quantVramGb, QUANTS, usableMemoryGb, verdictFor, verdictMeta } from '@/lib/verdict';
import type { GpuDevice, LlmModel, Quant, Verdict } from '@/types';

interface CheckerToolProps {
  models: LlmModel[];
  devices: GpuDevice[];
}

const verdictIcons: Record<Verdict, typeof CheckCircle2> = {
  yes: CheckCircle2,
  tight: AlertTriangle,
  no: XCircle,
};

const verdictCopy: Record<Verdict, string> = {
  yes: 'Comfortable fit — weights plus context headroom. Go build something.',
  tight: 'It can load, but context and buffers will squeeze. Try shorter contexts or a lower quant.',
  no: 'The weights will not fit. Pick a smaller quant, a smaller model, or bigger memory.',
};

export function CheckerTool({ models, devices }: CheckerToolProps) {
  const [modelSlug, setModelSlug] = useState<string>(models[0]?.slug ?? '');
  const [deviceSlug, setDeviceSlug] = useState<string>(devices[0]?.slug ?? '');
  const [quantId, setQuantId] = useState<string>(QUANTS[0]?.id ?? 'q4');

  const model = models.find((m) => m.slug === modelSlug);
  const device = devices.find((d) => d.slug === deviceSlug);
  const quant = QUANTS.find((q) => q.id === quantId);

  if (!model || !device || !quant) {
    return (
      <p className="card p-6 text-mist">Checker data failed to load. Please refresh the page.</p>
    );
  }

  const need = quantVramGb(model.paramsB, quant.bytesPerParam);
  const have = usableMemoryGb(device);
  const verdict = verdictFor(model, device, quant);
  const Icon = verdictIcons[verdict];

  return (
    <div id="checker" className="card overflow-hidden">
      <div className="grid gap-4 border-b border-line/60 bg-surface-raised p-5 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-mist">
            Model
          </span>
          <select
            value={modelSlug}
            onChange={(e) => setModelSlug(e.target.value)}
            className="select-field"
          >
            {models.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name} ({m.paramsB}B)
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-mist">
            Hardware
          </span>
          <select
            value={deviceSlug}
            onChange={(e) => setDeviceSlug(e.target.value)}
            className="select-field"
          >
            {devices.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-mist">
            Quantization
          </span>
          <div className="flex gap-2">
            {QUANTS.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setQuantId(q.id)}
                aria-pressed={quantId === q.id}
                className={`flex-1 rounded-xl border px-3 py-3 text-sm font-bold transition ${
                  quantId === q.id
                    ? 'border-neon-emerald bg-neon-emerald/10 text-neon-emerald'
                    : 'border-line bg-surface-raised text-mist hover:text-white'
                }`}
              >
                {q.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${verdictMeta[verdict].className}`}
        >
          <Icon className="h-8 w-8" aria-hidden />
        </div>
        <div className="flex-1">
          <p className="text-xl font-black text-white">
            {model.name} on {device.name} at {quant.shortLabel}:{' '}
            <span className={verdictMeta[verdict].className.split(' ').pop()}>
              {verdictMeta[verdict].label}
            </span>
          </p>
          <p className="mt-1 text-sm text-mist">
            Weights need ~<span className="tabular-nums text-white">{need} GB</span>; this setup
            offers ~<span className="tabular-nums text-white">{have} GB</span> usable.{' '}
            {verdictCopy[verdict]}
          </p>
        </div>
        <Link
          href={`/models/${model.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-white transition hover:border-neon-emerald/60 hover:text-neon-emerald"
        >
          Model details
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
