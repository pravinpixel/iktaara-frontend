import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from 'src/lib/api/user';
import { AuthConfig } from 'src/configs/auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await api.login((res: any) => {
          if (res.status_code == 200) {
            const loggedUser: any = res.data.customer_data;
            window.localStorage.setItem('user', JSON.stringify(loggedUser));
            window.localStorage.setItem(
              AuthConfig.tokenName,
              res.data.authorization.access_token,
            );
            return {
              id: loggedUser.id,
              name: loggedUser.first_name,
              email: loggedUser.email,
            };
          }
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        };
      },
    }),
    GoogleProvider({
      clientId:
        '1037890068490-mr32ctk9tg8ke0ce8evob17frr8bs1ds.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
