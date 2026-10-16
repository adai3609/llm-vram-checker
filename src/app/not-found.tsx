import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="text-7xl font-black text-mint">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">This page doesn’t fit in memory</h1>
      <p className="mt-3 max-w-md text-mist">
        The page you’re looking for was never loaded. Head back and pick a model that does fit.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-neon-emerald px-5 py-3 text-sm font-bold text-ink transition hover:shadow-glow-emerald"
      >
        Back to the checker
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
