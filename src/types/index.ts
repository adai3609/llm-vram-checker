export type Verdict = 'yes' | 'tight' | 'no';

export interface Quant {
  id: string;
  label: string;
  shortLabel: string;
  bytesPerParam: number;
}

export interface LlmModel {
  slug: string;
  name: string;
  org: string;
  /** Total parameters in billions */
  paramsB: number;
  released: string;
  /** Mixture-of-experts: all weights still must fit in memory */
  moe?: boolean;
  summary: string;
}

export interface GpuDevice {
  slug: string;
  name: string;
  kind: 'gpu' | 'mac' | 'cpu';
  memoryGb: number;
  /** Apple unified memory — macOS reserves a share of total RAM */
  unified?: boolean;
  summary: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}
