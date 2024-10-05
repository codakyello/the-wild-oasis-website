import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getGuest,
  createGuest,
  signIn as signInFn,
  login,
} from "@/app/_lib/data-service";
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Here, you'd call your API or database to check the user's credentials
        try {
          const result = await login(credentials.email, credentials.password);
          const { token, user } = result;

          return { ...user, token };
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        console.log("user is", user);
        token.user = user;
        token.accessToken = user?.token;
      }
      console.log("no error regturning token");
      return token;
    },
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        await getGuest(user.email);

        return true;
      } catch (err) {
        if (err.message.toLowerCase() === "no user was found") {
          console.log("creating user");
          await createGuest({
            fullName: user.name,
            image: user.image,
            email: user.email,
          });
          return true;
        }

        return false;
      }
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user = token.user; // Store user info from the credentials provider
        session.token = token.accessToken; // Store the token
        return session;
      }

      const result = await signInFn(session.user.email);

      if (!result) return session;

      console.log(result);
      const { token: accessToken, user } = result;

      session.user.guestId = user._id;
      session.user.fullName = user.fullName;
      session.token = accessToken;

      console.log("session is", session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
