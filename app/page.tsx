'use client';

import { useRef } from 'react';
import { useScroll } from 'react-use';

import Header from '@/components/Header';
import ColorRightBlockBackground from '@/components/ColorRightBlockBackground';

export default function Page() {
  const scrollRef = useRef(null);
  const { x, y } = useScroll(scrollRef);

  console.log(x, y, 'x, y');

  return (
    <main ref={scrollRef}>
      <Header />
      <section className="min-h-[922px] h-screen bg-sky-50 overflow-hidden relative">
        <ColorRightBlockBackground />
      </section>
    </main>
  );
}
