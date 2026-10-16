import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { DeviceMatrixTable } from '@/components/checker/MatrixTables';
import { AdSlot } from '@/components/site/AdSlot';
import { devices } from '@/data/hardware';
import { models } from '@/data/models';
import { pageMetadata } from '@/lib/seo';
import { usableMemoryGb } from '@/lib/verdict';

interface HardwarePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return devices.map((device) => ({ slug: device.slug }));
}

export async function generateMetadata({ params }: HardwarePageProps): Promise<Metadata> {
  const { slug } = await params;
  const device = devices.find((d) => d.slug === slug);
  if (!device) return {};
  return pageMetadata({
    title: `${device.name} for Local LLMs — What Fits in ~${usableMemoryGb(device)} GB`,
    description: `Which LLMs run on ${device.name}? Realistic usable memory ≈ ${usableMemoryGb(device)} GB — verdicts for Llama, Mistral, Qwen, Gemma and more at Q4 and Q8.`,
    path: `/hardware/${device.slug}`,
  });
}

export default async function HardwareDetailPage({ params }: HardwarePageProps) {
  const { slug } = await params;
  const device = devices.find((d) => d.slug === slug);
  if (!device) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Hardware', href: '/hardware' },
          { name: device.name, href: `/hardware/${device.slug}` },
        ]}
      />

      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        Local LLMs on {device.name}
      </h1>
      <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-mist">
        usable memory ≈ {usableMemoryGb(device)} GB
        {device.unified ? ' · macOS unified-memory assumption: 70%' : ''}
        {device.kind === 'cpu' ? ' · system-RAM assumption: 80%' : ''}
      </p>

      <p className="mt-6 max-w-3xl leading-relaxed text-mist">{device.summary}</p>

      <h2 className="mt-10 text-2xl font-bold tracking-tight text-white">
        Model verdicts at Q4 and Q8
      </h2>
      <div className="mt-5">
        <DeviceMatrixTable device={device} models={models} />
      </div>

      <AdSlot className="mt-10" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-white">How to read this</h2>
        <div className="prose-site mt-4 text-sm">
          <p>
            Each cell shows the estimated weight size at that quantization (parameters ×
            bytes-per-weight) and whether it fits in this machine’s usable memory plus a 2 GB
            headroom for context and buffers. “Tight fit” means the weights load but long
            contexts will struggle — prefer Q4, shorter contexts, or a smaller model.
          </p>
          <p>
            Speed is a separate question from capacity: a fit verdict does not promise fast
            generation, especially on CPU-only setups where single-digit tokens per second are
            normal for 7B+ models.
          </p>
        </div>
      </section>
    </>
  );
}
