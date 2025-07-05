import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Baloch Brothers Association - Construction & Civil Contractors',
  description: 'Professional construction, civil work, and maintenance services by Baloch Brothers Association. Quality construction projects across Pakistan.',
  keywords: 'construction, civil contractor, building, renovation, maintenance, Pakistan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}