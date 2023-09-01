import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      studentId: number;
      studentName: string;
      nickname: string;
    };
  }
}
