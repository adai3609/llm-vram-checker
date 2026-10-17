import type { Metadata } from 'next';

export const siteConfig = {
  name: 'LLM VRAM Checker',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://llmvramchecker.example',
  description:
    'Can your GPU run local LLMs? Check VRAM requirements for Llama, Mistral, Qwen, Gemma and more — by quantization, for RTX cards, Macs and CPU-only setups.',
} as const;

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({ title, description, path }: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}
