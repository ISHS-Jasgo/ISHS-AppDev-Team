'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => signOut()} className="bg-red-600">
        로그아웃
      </button>
      <button onClick={() => router.push('/chat')} className="bg-yellow-300">
        채팅
      </button>
    </div>
  );
}
