import Link from 'next/link';
import { footerDisclaimer, siteNav } from '@/data/site';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line/60 bg-ink-soft">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-lg font-black tracking-tight text-white">
              LLM <span className="text-mint">VRAM Checker</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
              Transparent, formula-based VRAM planning for local LLMs — no signup, no hype, the
              math is on the page.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-xs font-bold uppercase tracking-widest text-neon-emerald">Pages</p>
            <ul className="mt-3 space-y-2 text-sm">
              {siteNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-mist hover:text-neon-emerald">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-line/60 pt-6 text-xs leading-relaxed text-mist/60">
          {footerDisclaimer}
        </p>
      </div>
    </footer>
  );
}
