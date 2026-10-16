import type { GpuDevice } from '@/types';

export const devices: GpuDevice[] = [
  {
    slug: 'rtx-4090',
    name: 'RTX 4090 (24 GB)',
    kind: 'gpu',
    memoryGb: 24,
    summary:
      'The consumer king for local LLMs: 24 GB fits Qwen2.5 32B / Gemma 2 27B at Q4 outright.',
  },
  {
    slug: 'rtx-3090',
    name: 'RTX 3090 (24 GB)',
    kind: 'gpu',
    memoryGb: 24,
    summary:
      'Last gen’s 24 GB value king. Used-market favorite for exactly this workload.',
  },
  {
    slug: 'rtx-4070-ti-super',
    name: 'RTX 4070 Ti SUPER (16 GB)',
    kind: 'gpu',
    memoryGb: 16,
    summary:
      '16 GB class: 14B models at Q8, 27–32B models at Q4 with headroom checks.',
  },
  {
    slug: 'rtx-4060-ti-16gb',
    name: 'RTX 4060 Ti (16 GB)',
    kind: 'gpu',
    memoryGb: 16,
    summary:
      'The budget 16 GB option — slower than a Ti SUPER but same memory capacity class.',
  },
  {
    slug: 'rtx-3060',
    name: 'RTX 3060 (12 GB)',
    kind: 'gpu',
    memoryGb: 12,
    summary:
      'The classic entry point for local LLMs: 8–14B models at Q4 fit with room for context.',
  },
  {
    slug: 'rtx-4060',
    name: 'RTX 4060 (8 GB)',
    kind: 'gpu',
    memoryGb: 8,
    summary:
      '8 GB is the practical floor for GPU acceleration — 7–9B models at Q4, tighter at Q8.',
  },
  {
    slug: 'macbook-air-m2-8gb',
    name: 'MacBook Air M2 (8 GB unified)',
    kind: 'mac',
    memoryGb: 8,
    unified: true,
    summary:
      'Unified memory, but macOS keeps a share: ~5.6 GB realistically usable for weights.',
  },
  {
    slug: 'macbook-pro-m4-pro-48gb',
    name: 'MacBook Pro M4 Pro (48 GB unified)',
    kind: 'mac',
    memoryGb: 48,
    unified: true,
    summary:
      '~33.6 GB usable — 32B models at Q8 or 70B-class at Q4 are in range.',
  },
  {
    slug: 'mac-studio-m2-max-64gb',
    name: 'Mac Studio M2 Max (64 GB unified)',
    kind: 'mac',
    memoryGb: 64,
    unified: true,
    summary:
      '~44.8 GB usable — the single-box path to 70B-class models at Q4.',
  },
  {
    slug: 'cpu-only-32gb',
    name: 'CPU only (32 GB system RAM)',
    kind: 'cpu',
    memoryGb: 32,
    unified: false,
    summary:
      'Slow but workable: ~25.6 GB usable for weights. 14B at Q8 or 32B at Q4, at browsing-speed tokens.',
  },
  {
    slug: 'cpu-only-16gb',
    name: 'CPU only (16 GB system RAM)',
    kind: 'cpu',
    memoryGb: 16,
    unified: false,
    summary:
      '~12.8 GB usable — 7–9B models at Q4 run, 14B at Q4 is a tight squeeze.',
  },
];
