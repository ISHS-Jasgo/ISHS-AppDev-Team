'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import TestLogin from '@/components/test/TestLogin';
import TestRegister from '@/components/test/TestRegister';

export default function Page() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
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
