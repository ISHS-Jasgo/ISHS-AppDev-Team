'use client';

import useInput from '@/hooks/useInput';
import CoolButton from '../ui/CoolButton';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const [id, idInput] = useInput('학번 (Ex : 292416)', { type: 'number' });
  const [name, nameInput] = useInput('이름');
  const [nickname, nicknameInput] = useInput('닉네임');
  const [password, passwordInput] = useInput('비밀번호', { type: 'password' });

  const onClick = async () => {
    const formData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: parseInt(id),
        studentName: name,
        nickname,
        password,
      }),
    };

    await fetch('/api/user/create', formData);
    await signIn('credentials', {
      redirect: false,
      studentId: id,
      password,
    });

    alert('회원가입이 완료되었습니다.');
    window.location.replace('/');
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h1 className="text-2xl font-semibold">회원가입</h1>
      <p className="mb-3">처음 오셨군요!😆</p>
      <div className="flex flex-col gap-1 mb-3">
        {idInput}
        {nameInput}
        {nicknameInput}
        {passwordInput}
      </div>
      <CoolButton onClick={onClick}>회원가입</CoolButton>
    </div>
  );
}
