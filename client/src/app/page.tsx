'use client';

import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <div className="flex-1">
      <button onClick={() => signIn()} className="bg-red-400">
        로그인
      </button>
    </div>
  );
}
