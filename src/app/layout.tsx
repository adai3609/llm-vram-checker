import type { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { siteConfig } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Can Your GPU Run Local LLMs? — VRAM Checker & Requirements',
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-content flex-1 px-4 py-10 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
