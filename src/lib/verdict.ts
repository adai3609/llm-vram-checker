import type { GpuDevice, LlmModel, Quant, Verdict } from '@/types';

export const QUANTS: Quant[] = [
  { id: 'q4', label: 'Q4 — 4-bit quantized', shortLabel: 'Q4', bytesPerParam: 0.58 },
  { id: 'q8', label: 'Q8 — 8-bit quantized', shortLabel: 'Q8', bytesPerParam: 1.06 },
];

/** Approximate VRAM (GB) for weights at a given quantization. */
export function quantVramGb(paramsB: number, bytesPerParam: number): number {
  return Math.round(paramsB * bytesPerParam * 10) / 10;
}

/**
 * Realistic usable memory:
 * - discrete GPU: full VRAM is yours (minus ~300 MB display overhead, folded
 *   into the +2 GB headroom rule)
 * - Mac unified memory: macOS reserves a share — assume 70% usable for models
 * - CPU-only: system RAM minus OS footprint — assume 80%
 */
export function usableMemoryGb(device: GpuDevice): number {
  if (device.unified) return Math.round(device.memoryGb * 0.7 * 10) / 10;
  if (device.kind === 'cpu') return Math.round(device.memoryGb * 0.8 * 10) / 10;
  return device.memoryGb;
}

/** Transparent rule: need = quant size + 2 GB headroom for context & buffers. */
export function verdictFor(model: LlmModel, device: GpuDevice, quant: Quant): Verdict {
  const need = quantVramGb(model.paramsB, quant.bytesPerParam);
  const have = usableMemoryGb(device);
  if (have >= need + 2) return 'yes';
  if (have >= need) return 'tight';
  return 'no';
}

export const verdictMeta: Record<Verdict, { label: string; className: string }> = {
  yes: { label: 'Runs well', className: 'bg-emerald-400/15 text-emerald-400' },
  tight: { label: 'Tight fit', className: 'bg-neon-amber/15 text-neon-amber' },
  no: { label: 'Too big', className: 'bg-rose-400/15 text-rose-400' },
};
