'use client';

import useSessionUser from '@/hooks/useSessionUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SocketIOClient from 'socket.io-client';

export default function Chat() {
  const router = useRouter();
  const user = useSessionUser();

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/');
    } else {
      console.log(user.nickname);

      const socketUrl = 'http://localhost:3001';
      const socket = SocketIOClient(socketUrl, {
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('socket connected');
      });
    }
  }, [user, router]);

  return <div>채팅 페이지</div>;
}
