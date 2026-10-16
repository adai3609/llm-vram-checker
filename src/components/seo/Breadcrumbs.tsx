import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbJsonLd, JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/seo';
import type { BreadcrumbItem } from '@/types';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mist">
      <JsonLd data={breadcrumbJsonLd(items, siteConfig.url)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-white">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-neon-emerald">
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-line" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
