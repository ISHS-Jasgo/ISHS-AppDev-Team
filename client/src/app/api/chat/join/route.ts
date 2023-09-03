import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const chatRooms = await prisma.chatRoom.findMany();
  console.log(chatRooms, 'chatRooms');

  if (!chatRooms) {
    return new Response(null, { status: 200 });
  } else {
    return new Response(JSON.stringify(chatRooms), { status: 200 });
  }
}
