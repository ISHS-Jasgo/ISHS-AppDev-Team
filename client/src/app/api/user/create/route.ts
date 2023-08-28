import prisma from '@/lib/prisma';

interface RequestBody {
  studentId: number;
  studentName: string;
  nickname: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  // 기수
  const studentYear = Math.floor(body.studentId / 10000);
  // 반
  const studentClass = Math.floor((body.studentId % 1000) / 100);
  // 번호
  const studentNumber = body.studentId % 100;

  const data = { ...body, studentYear, studentClass, studentNumber };
  await prisma.user.create({ data });

  return new Response(null, { status: 201 });
}
