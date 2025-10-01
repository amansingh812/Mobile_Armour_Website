import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendOtpEmail } from "@/lib/mailer";

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

          // If user not verified, send OTP and block login
          if (!user.isVerified) {
            // Guard against duplicate sends (e.g., dev double-invocation)
            const now = new Date();
            const canResend = !user.lastOtpSentAt || (now.getTime() - new Date(user.lastOtpSentAt).getTime() >= 60 * 1000);

            if (canResend) {
              const otp = Math.floor(100000 + Math.random() * 900000).toString();
              const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
              user.otpCodeHash = otpHash;
              user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
              user.otpAttempts = 0;
              user.lastOtpSentAt = now;
              await user.save();
              try {
                await sendOtpEmail(user.email, otp);
              } catch (e) {
                console.error("Failed to send OTP email in authorize:", e);
              }
            } else {
              // Do not send again; reuse existing OTP window
              // Ensure expiry is still valid; if not, allow resend on next attempt
              if (!user.otpExpiresAt || now > new Date(user.otpExpiresAt)) {
                user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
                await user.save();
              }
            }

            // Throw an error string that the frontend can detect
            throw new Error("EMAIL_NOT_VERIFIED");
          }

          return {
            id: user._id.toString(),
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
          };
        } catch (error: any) {
          console.error("Authentication error:", error);
          // Re-throw EMAIL_NOT_VERIFIED error so it reaches the client
          if (error?.message === "EMAIL_NOT_VERIFIED") {
            throw error;
          }
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
