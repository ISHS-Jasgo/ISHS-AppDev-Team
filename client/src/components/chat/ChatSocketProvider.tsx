'use client';

import { SocketContext, socket } from '@/context/socket';

export default function ChatSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
