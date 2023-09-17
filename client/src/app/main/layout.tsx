import Footer from '@/components/page/Footer';
import NavBar from '@/components/page/NavBar';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="pt-8 flex justify-center 2xl:px-36 xl:px-24 lg:px-16 px-8 h-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
