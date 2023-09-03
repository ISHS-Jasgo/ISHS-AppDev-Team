import ChatRooms from '@/components/chat/ChatRooms';
import JoinRoomInput from '@/components/chat/JoinRoomInput';
import authOptions from '@/lib/auth/auth';
import { getServerSession } from 'next-auth';
import ChatSocketProvider from '@/components/chat/ChatSocketProvider';

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <ChatSocketProvider>
      <div className="w-full h-full flex justify-center bg-slate-50">
        <div className="w-full py-5 px-3 mx-20 md:mx-56 my-8 rounded flex flex-col place-content-between">
          <div className="flex justify-center">
            <h1 className="text-2xl font-semibold">채팅방 목록</h1>
          </div>
          <ChatRooms />
          <JoinRoomInput nickname={session!.user.nickname} />
        </div>
      </div>
    </ChatSocketProvider>
  );
}
