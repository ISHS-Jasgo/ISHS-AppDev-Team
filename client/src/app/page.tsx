'use client';

import { signOut } from 'next-auth/react';
import useSessionUser from '@/hooks/useSessionUser';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import TestLogin from '@/components/test/TestLogin';
import TestRegister from '@/components/test/TestRegister';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const user = useSessionUser();
  const router = useRouter();

  return (
    <div className="flex-1">
      {user ? (
        <div>
          <button onClick={() => signOut()} className="bg-red-600">
            로그아웃
          </button>
          <button
            onClick={() => router.push('/chat')}
            className="bg-yellow-300"
          >
            채팅
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-emerald-600"
          >
            로그인
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className=" bg-indigo-600"
          >
            회원가입
          </button>
        </div>
      )}

      {isLoginModalOpen && (
        <Modal modalCloser={() => setIsLoginModalOpen(false)}>
          <TestLogin />
        </Modal>
      )}
      {isRegisterModalOpen && (
        <Modal modalCloser={() => setIsRegisterModalOpen(false)}>
          <TestRegister />
        </Modal>
      )}
    </div>
  );
}
