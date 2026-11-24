import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const expectedEmail = process.env.BISHOPRIC_EMAIL?.toLowerCase();
        const passwordHash = process.env.BISHOPRIC_PASSWORD_HASH;

        if (!expectedEmail || !passwordHash) {
          console.error("Missing BISHOPRIC_EMAIL or BISHOPRIC_PASSWORD_HASH");
          return null;
        }

        const { email, password } = parsed.data;
        if (email.toLowerCase() !== expectedEmail) {
          return null;
        }

        const passwordsMatch = await compare(password, passwordHash);
        if (!passwordsMatch) {
          return null;
        }

        return {
          id: "bishopric-owner",
          name: "Bishopric",
          email: expectedEmail,
        };
      },
    }),
  ],
});
