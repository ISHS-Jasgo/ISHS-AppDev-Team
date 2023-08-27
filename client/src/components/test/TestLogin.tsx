'use client';

import useInput from '@/hooks/useInput';
import CoolButton from '../ui/CoolButton';
import { signIn } from 'next-auth/react';

export default function TestLogin() {
  const [id, setId, idInput] = useInput('학번');
  const [password, setPassword, passwordInput] = useInput('비밀번호');

  const onClick = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      studentId: id,
      password: password,
    });

    if (!result || result.error) {
      alert('로그인에 실패했습니다.');
      setId('');
      setPassword('');
      return;
    }

    alert('로그인에 성공했습니다.');
    window.location.replace('/');
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h1 className="text-2xl font-semibold">로그인</h1>
      <p className="mb-3">먼저 로그인하세요!😊</p>
      <div className="flex flex-col gap-1 mb-3">
        {idInput}
        {passwordInput}
      </div>
      <CoolButton onClick={onClick}>로그인</CoolButton>
    </div>
  );
}
