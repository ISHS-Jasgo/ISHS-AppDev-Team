import { ChatRoom } from '@prisma/client';
import CoolButton from '../ui/CoolButton';

interface Props {
  chatRoom: ChatRoom;
}

export default function ChatRoomBanner({ chatRoom }: Props) {
  return (
    <div className="flex flex-col h-fit rounded shadow">
      <div className="h-12 bg-white flex flex-col px-2">
        <div className="flex justify-between pt-2">
          <div className="font-medium text-lg">{chatRoom.title}</div>
          <div className="flex gap-0.5">
            <CoolButton onClick={() => {}}>입장</CoolButton>
            <CoolButton onClick={() => {}}>삭제</CoolButton>
          </div>
        </div>
      </div>
      <div className="h-6 bg-slate-50 px-2 text-xs flex flex-col justify-center">
        Created at : {chatRoom.createdAt.toString()}
      </div>
    </div>
  );
}
