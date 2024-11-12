import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { app } from "./firebase";
import { signInSchema } from "./zod";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:FirestoreAdapter(app),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync({
            email: credentials.email,
            password: credentials.password,
          });

          if (!email || !password)
            throw new CredentialsSignin({
              cause: "Provide both email and password",
            });

          const user = await prisma.user.findUnique({
            where: { email },
          });
          user.image = user.profileImage;
          user.name = `${user.firstName} ${user.lastName}`;
          if (!user) {
            throw new CredentialsSignin("Invalid Email or password");
          }
          const passwordMatch = password === user.password;

          if (!passwordMatch) {
            throw new CredentialsSignin("Invalid Email or password");
          }
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
