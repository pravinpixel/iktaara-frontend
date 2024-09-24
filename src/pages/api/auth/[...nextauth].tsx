import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from 'src/lib/api/user';

export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: '/login',
  // },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email Login',
      id: 'sign-in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
        guest_token: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const loginData = {
          email: credentials.email,
          password: credentials.password,
          guest_token: credentials.guest_token,
        };
        const result = await api.login(loginData).then((res: any) => {
          if (res.status_code == 200) {
            const loggedUser: any = res.data.customer_data;
            return {
              id: loggedUser.id,
              name: loggedUser.first_name,
              email: loggedUser.email,
              data: loggedUser,
              token: res.data.authorization.access_token,
            };
          }
        });
        if (!result) {
          return null;
        }

        return {
          id: result.id,
          email: result.email,
          name: result.name,
          data: result.data,
          token: result.token,
        };
      },
    }),
    CredentialsProvider({
      name: 'OTP Login',
      id: 'otp-login',
      credentials: {
        phone: {
          label: 'Mobile No',
          type: 'text',
        },
        otp: { label: 'OTP', type: 'text' },
        guest_token: {},
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials.otp) {
          return null;
        }

        const loginData = {
          mobile_no: credentials.phone,
          otp: credentials.otp,
          guest_token: credentials.guest_token,
        };
        const result = await api.otpLogin(loginData).then((res: any) => {
          if (res.status_code == 200) {
            const loggedUser: any = res.data.customer_data;
            return {
              id: loggedUser.id,
              name: loggedUser.first_name,
              email: loggedUser.email,
              data: loggedUser,
              token: res.data.authorization.access_token,
            };
          }
        });
        if (!result) {
          return null;
        }

        return {
          id: result.id,
          email: result.email,
          name: result.name,
          data: result.data,
          token: result.token,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_LOGIN_ID || '',
      clientSecret: process.env.GOOGLE_LOGIN_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user) {
      if (user) return true;
      return false;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          user_id: token.user_id,
          token: token.token,
        },
      };
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.exp = Math.floor(Date.now() / 1000) + 3600;
      }
      if (account?.provider == 'google') {
        const postData = {
          provider: account.provider,
          type: account.provider,
          sub: account.providerAccountId,
          name: profile?.name,
          email: profile?.email,
          picture: profile?.image,
        };
        const result: any = await api.googleLogin(postData).then((res: any) => {
          if (res.status_code == 200) {
            return res.data;
          }
          return null;
        });
        if (result != null) {
          return {
            ...token,
            user_id: result.customer_data.id,
            token: result.authorization.access_token,
          };
        }
        return token;
      } else {
        if (user) {
          const u = user as unknown as any;
          return {
            ...token,
            user_id: u.data.id,
            //user: u.data,
            token: u.token,
          };
        }
        return token;
      }
    },
  },
};

export default NextAuth(authOptions);
