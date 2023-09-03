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
        <div className="w-full py-7 mx-28 md:mx-56 my-8 bg-white shadow flex flex-col place-content-between">
          <ChatRooms />
          <JoinRoomInput nickname={session!.user.nickname} />
        </div>
      </div>
    </ChatSocketProvider>
  );
}
