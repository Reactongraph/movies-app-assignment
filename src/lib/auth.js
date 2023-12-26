import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      async authorize(credentials) {
        const { email, password } = credentials;

        // API To be called

        // validate the response , if fail return null
        // if sucessful return below object
        return {
          authToken,
          expireTime,
          userName,
          email,
          isAuth: true,
        };
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },

    jwt: async ({ token, user }) => {
      return {
        ...token,
        ...user,
      };
    },
  },
};
