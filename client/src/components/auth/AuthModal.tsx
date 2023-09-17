'use client';

import { modalStateAtom } from '@/recoil/modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserSignupSession from './UserSignupSession';
import UserSigninSession from './UserSigninSession';

export default function AuthModal() {
  const modalState = useRecoilValue(modalStateAtom);
  if (!modalState) return null;
  return modalState === 'signin' ? (
    <UserSigninSession />
  ) : (
    <UserSignupSession />
  );
}
