'use client';

import { SocketContext } from '@/context/socket';
import { ChatRoom } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatRoomBanner from './ChatRoomBanner';

export default function ChatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('revalidate');
    socket.on('revalidate', (_chatRooms: ChatRoom[]) => {
      setChatRooms(_chatRooms);
    });
  }, [socket]);

  return (
    <div className="flex flex-col gap-3 flex-1 mt-9 mb-5">
      {chatRooms.map((chatRoom: ChatRoom) => (
        <ChatRoomBanner key={chatRoom.id} chatRoom={chatRoom} />
      ))}
    </div>
  );
}
