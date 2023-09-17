'use client';

import useInput from '@/hooks/useInput';
import { useRecoilState } from 'recoil';
import { modalStateAtom } from '@/recoil/modal';
import { useCallback } from 'react';

export default function UserSigninSession() {
  const [nickname, nicknameInput, setNickname] = useInput('닉네임');
  const [password, passwordInput, setPassword] = useInput('비밀번호');

  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const onStudentSignup = useCallback(() => {
    setModalState('signup');
  }, [setModalState]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-full mx-9 justify-center gap-4">
        <div className="text-3xl font-bold mb-4">로그인</div>
        {nicknameInput}
        {passwordInput}
        <button className="mt-2.5 w-full h-12 bg-blue-500 text-white font-lg rounded-sm">
          로그인하기
        </button>
        <div className="flex gap-2">
          <span>처음이신가요?</span>
          <span
            onClick={onStudentSignup}
            className="text-blue-500 hover:cursor-pointer underline"
          >
            학생 회원가입
          </span>
          <span className="text-blue-500 hover:cursor-pointer underline">
            교직원 회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
