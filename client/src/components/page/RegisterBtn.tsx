'use client';

import { modalStateAtom } from '@/recoil/modal';
import { useSetRecoilState } from 'recoil';

export default function RegisterBtn() {
  const setIsModalOpen = useSetRecoilState(modalStateAtom);

  return (
    <div className="flex-0 justify-start pt-2">
      <button onClick={() => setIsModalOpen('signin')}>
        로그인 / 회원가입
      </button>
    </div>
  );
}
