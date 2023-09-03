import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

interface RequestBody {
  title: string;
  authorNickname: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  await prisma.chatRoom.create({
    data: {
      title: body.title,
      userCount: 1,
      users: {
        connect: {
          nickname: body.authorNickname,
        },
      },
    },
  });

  return new Response(null, { status: 201 });
}
