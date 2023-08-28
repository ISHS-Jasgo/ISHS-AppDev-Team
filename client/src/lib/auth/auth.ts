import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../prisma';
import { User } from '@prisma/client';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        studentId: { label: 'studentId', type: 'number' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.studentId || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            studentId: parseInt(credentials.studentId),
          },
        });

        if (!user) {
          return null;
        }

        if (user.password !== credentials.password) {
          return null;
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    jwt: async ({ token, user }: { token: any; user: User }) => {
      if (user) {
        token.user = {};
        token.user.studentId = user.studentId;
        token.user.studentName = user.studentName;
        token.user.nickname = user.nickname;
      }
      return token;
    },

    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
