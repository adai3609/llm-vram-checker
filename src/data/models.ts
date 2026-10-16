import type { LlmModel } from '@/types';

/**
 * Parameter counts are public, well-documented figures for open-weight
 * models. VRAM numbers on this site are always computed estimates, never
 * benchmarks — see lib/verdict.ts for the transparent formula.
 */
export const models: LlmModel[] = [
  {
    slug: 'llama-3-1-8b',
    name: 'Llama 3.1 8B',
    org: 'Meta',
    paramsB: 8,
    released: '2024-07',
    summary:
      'Meta’s workhorse 8B model. The default first local LLM — strong general performance at a size almost any modern GPU can host.',
  },
  {
    slug: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    org: 'Meta',
    paramsB: 70,
    released: '2024-12',
    summary:
      'Meta’s flagship open model. Near-frontier quality, but needs roughly 40 GB at Q4 — multi-GPU, a 24 GB card at aggressive quantization, or a big-memory Mac.',
  },
  {
    slug: 'mistral-7b',
    name: 'Mistral 7B',
    org: 'Mistral AI',
    paramsB: 7,
    released: '2023-09',
    summary:
      'The model that made 7B respectable. Compact, fast, and a long-standing favorite for CPU-only and 8 GB GPU setups.',
  },
  {
    slug: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    org: 'Mistral AI',
    paramsB: 47,
    released: '2023-12',
    moe: true,
    summary:
      'A sparse mixture-of-experts model: 47B total parameters, ~13B active per token. Fast for its quality — but all 47B of weights still must fit in memory.',
  },
  {
    slug: 'qwen2-5-7b',
    name: 'Qwen2.5 7B',
    org: 'Alibaba',
    paramsB: 7,
    released: '2024-09',
    summary:
      'Alibaba’s 7B, strong on coding and multilingual tasks. A top pick in the 8 GB GPU class.',
  },
  {
    slug: 'qwen2-5-14b',
    name: 'Qwen2.5 14B',
    org: 'Alibaba',
    paramsB: 14,
    released: '2024-09',
    summary:
      'The 14B tier of Qwen2.5 — a clear quality step from 7B that still fits a 12 GB card at Q4.',
  },
  {
    slug: 'qwen2-5-32b',
    name: 'Qwen2.5 32B',
    org: 'Alibaba',
    paramsB: 32,
    released: '2024-09',
    summary:
      'The sweet spot of the Qwen2.5 family for many: flagship-adjacent quality that fits a 24 GB card at Q4.',
  },
  {
    slug: 'qwen2-5-72b',
    name: 'Qwen2.5 72B',
    org: 'Alibaba',
    paramsB: 72,
    released: '2024-09',
    summary:
      'Qwen2.5 at near-frontier scale. Comparable memory class to Llama 3.3 70B — around 43 GB at Q4.',
  },
  {
    slug: 'gemma-2-9b',
    name: 'Gemma 2 9B',
    org: 'Google',
    paramsB: 9,
    released: '2024-06',
    summary:
      'Google’s 9B model, known for punching above its size in conversational quality. Fits comfortably on 8–12 GB cards at Q4.',
  },
  {
    slug: 'gemma-2-27b',
    name: 'Gemma 2 27B',
    org: 'Google',
    paramsB: 27,
    released: '2024-06',
    summary:
      'The large Gemma 2. Around 16 GB at Q4 — 16 GB-class cards and 32 GB Macs are the natural hosts.',
  },
  {
    slug: 'phi-4-14b',
    name: 'Phi-4 14B',
    org: 'Microsoft',
    paramsB: 14,
    released: '2024-12',
    summary:
      'Microsoft’s small-model line focused on reasoning quality per parameter. Efficient at 14B and friendly to 12 GB cards.',
  },
  {
    slug: 'muse-spark-open',
    name: 'Muse Spark Open 816B',
    org: 'Meta',
    paramsB: 816,
    released: '2026-10',
    moe: true,
    summary:
      'Meta’s open-weight flagship (816B total, 42B active, 1M-token context). Runs on two Mac Studio-class machines at inference providers — consumer GPUs need not apply. Included here as the honest upper bound of the chart.',
  },
];
