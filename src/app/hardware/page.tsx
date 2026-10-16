import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { devices } from '@/data/hardware';
import { usableMemoryGb } from '@/lib/verdict';

export const metadata: Metadata = pageMetadata({
  title: 'Local LLM Hardware Database — What Fits in Your VRAM',
  description:
    'RTX cards, Apple Macs and CPU-only setups, matched against every major open-weight LLM. Realistic usable-memory figures and per-model verdicts.',
  path: '/hardware',
});

const groups = [
  { kind: 'gpu' as const, title: 'NVIDIA GPUs' },
  { kind: 'mac' as const, title: 'Apple Silicon (unified memory)' },
  { kind: 'cpu' as const, title: 'CPU only (system RAM)' },
];

export default function HardwarePage() {
  return (
    <>
      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        Local LLM hardware database
      </h1>
      <p className="mt-3 max-w-2xl text-mist">
        Each hardware page lists which models fit — and at which quantization. Usable memory
        accounts for macOS reserving a share of unified memory and OS overhead on system RAM.
      </p>

      {groups.map((group) => (
        <section key={group.kind} className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-white">{group.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devices
              .filter((device) => device.kind === group.kind)
              .map((device) => (
                <Link
                  key={device.slug}
                  href={`/hardware/${device.slug}`}
                  className="card card-hover block p-5"
                >
                  <p className="font-bold text-white">{device.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-mist">
                    usable ≈ {usableMemoryGb(device)} GB
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-mist">{device.summary}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
