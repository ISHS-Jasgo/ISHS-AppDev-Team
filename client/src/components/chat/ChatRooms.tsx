'use client';

import { SocketContext } from '@/context/socket';
import { ChatRoom } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';

export default function ChatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const socket = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    socket.on('chatRooms', (_chatRooms: ChatRoom[]) => {
      setChatRooms(_chatRooms);
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-3">
      {chatRooms.map((chatRoom: any) => (
        <div key={chatRoom.id} className="bg-orange-200">
          {chatRoom.title}
        </div>
      ))}
    </div>
  );
}
