import { useSession } from 'next-auth/react';

export default function useSessionUser() {
  const { data: session } = useSession();
  const user = session?.user;

  return user;
}
