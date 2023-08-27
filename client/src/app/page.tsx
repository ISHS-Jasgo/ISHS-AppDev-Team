'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import TestLogin from '@/components/test/TestLogin';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1">
      <button onClick={() => signIn()} className="bg-red-400">
        로그인
      </button>
      <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600">
        모달
      </button>
      {isModalOpen && (
        <Modal modalCloser={() => setIsModalOpen(false)}>
          <TestLogin />
        </Modal>
      )}
    </div>
  );
}
