import { useSession } from 'next-auth/react';

export interface User {
  pro?: boolean;
}

export function useUser(): User {
  const { data } = useSession();
  return (data?.user as unknown as User) || {};
}
