'use client';

import useInput from '@/hooks/useInput';
import CoolButton from '../ui/CoolButton';
import { useContext } from 'react';
import { SocketContext } from '@/context/socket';

interface Props {
  nickname: string;
}

export default function JoinRoom({ nickname }: Props) {
  const [title, titleInput, setTitle] = useInput('방 제목을 입력하세요');

  const socket = useContext(SocketContext);

  const onClick = async () => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, authorNickname: nickname }),
    };
    await fetch('/api/chat/new', data);
    setTitle('');
    socket.emit('revalidate');
  };

  return (
    <div className="flex justify-center gap-0.5">
      {titleInput}
      <CoolButton onClick={onClick}>참여하기</CoolButton>
    </div>
  );
}
