import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Managing Co',
  description: 'It is a digital agency provide Web Development, AI Development, Mobile App Development and SEO Services.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className={`${geistSans.className} font-sans antialiased bg-[#020617] text-neutral-100 selection:bg-cyan-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}