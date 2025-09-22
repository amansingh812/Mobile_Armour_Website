import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await dbConnect();

        try {
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await user.comparePassword(
            credentials.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/account/login",
    signOut: "/",
    error: "/account/login",
    verifyRequest: "/account/verify-request",
    newUser: "/account/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();
        const email = user.email?.toLowerCase();
        if (!email) return false;

        let existing = await User.findOne({ email });
        if (!existing) {
          const randomPassword = crypto.randomBytes(16).toString("hex");
          const created = await User.create({
            name: user.name || (profile as any)?.name || email.split("@")[0],
            email,
            password: randomPassword,
            isVerified: true,
          });
          (user as any)._id = created._id.toString();
        } else {
          const nextName = user.name || existing.name;
          if (nextName !== existing.name) {
            existing.name = nextName;
            await existing.save();
          }
          (user as any)._id = existing._id.toString();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = (user as any)._id?.toString();
        token.isVerified = (user as any).isVerified;
        token.isAcceptingMessages = (user as any).isAcceptingMessages;
        token.usrname = (user as any).usrname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any)._id = token._id as string;
        (session.user as any).isVerified = token.isVerified as boolean;
        (session.user as any).isAcceptingMessages = token.isAcceptingMessages as boolean;
        (session.user as any).usrname = token.usrname as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
