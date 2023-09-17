'use client';

import useInput from '@/hooks/useInput';
import CoolButton from '../ui/CoolButton';
import { useRecoilState } from 'recoil';
import { modalStateAtom } from '@/recoil/modal';
import { useCallback } from 'react';

export default function UserSignupSession() {
  const [code, codeInput, setCode] = useInput('고유 코드를 입력하세요');
  const [id, idInput, setId] = useInput('아이디');
  const [email, emailInput, setEmail] = useInput('이메일');
  const [password, passwordInput, setPassword] = useInput('비밀번호');
  const [passwordCheck, passwordCheckInput, setPasswordCheck] =
    useInput('비밀번호 확인');

  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const onSignin = useCallback(() => {
    setModalState('signin');
  }, [setModalState]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-full mx-9 justify-center gap-5">
        <div className="text-3xl font-bold mb-5">회원가입</div>
        <div className="flex gap-7">
          {codeInput}
          <CoolButton>인증하기</CoolButton>
        </div>
        {idInput}
        {emailInput}
        {passwordInput}
        {passwordCheckInput}
        <button className="mt-2.5 w-full h-12 bg-blue-500 text-white font-lg rounded-sm">
          가입하기
        </button>
        <div>
          이미 계정이 있나요?{' '}
          <span
            onClick={onSignin}
            className="text-blue-500 hover:cursor-pointer underline"
          >
            로그인하기
          </span>
        </div>
      </div>
    </div>
  );
}
