'use client';

import clsx from 'clsx';
import { useMedia } from 'react-use';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDark = useMedia('(prefers-color-scheme: dark)');

  return (
    <html lang="en" className={clsx({ dark: isDark })}>
      <body>{children}</body>
    </html>
  );
}
