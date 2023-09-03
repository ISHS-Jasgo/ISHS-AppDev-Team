import authOptions from '@/lib/auth/auth';
import { getServerSession } from 'next-auth';
import UserWithSession from '@/components/page/UserWithSession';
import UserWithoutSession from '@/components/page/UserWithoutSession';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex-1">
      {session?.user ? <UserWithSession /> : <UserWithoutSession />}
    </div>
  );
}
