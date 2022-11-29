'use client';

import React from 'react';
import Header from '@/components/EditResumePage/Header';
import Menu from '@/components/EditResumePage/Menu';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="bg-slate-50 min-h-screen h-full">
      <Header />
      <div className="flex">
        <Menu id={params.id} />
      </div>
    </div>
  );
};

export default Page;
