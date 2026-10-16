'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteNav } from '@/data/site';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-black tracking-tight text-white">
          LLM <span className="text-mint">VRAM Checker</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-mist transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#checker"
            className="rounded-lg bg-neon-emerald px-4 py-2 text-sm font-bold text-ink transition hover:shadow-glow-emerald"
          >
            Check my GPU
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-mist hover:text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile" className="border-t border-line/60 bg-ink px-4 pb-4 pt-2 md:hidden">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-lg px-3 py-2 text-sm text-mist hover:bg-surface hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
