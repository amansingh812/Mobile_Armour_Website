import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import bcrypt from 'bcrypt';
import User from "@/models/User";

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
    providers: [
        // Email/Password authentication
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                
                await dbConnect();
                
                try {
                    // Find the user by email
                    const user = await User.findOne({ email: credentials.email.toLowerCase() });
                    
                    // If no user found, return null (which will trigger an error)
                    if (!user) {
                        return null;
                    }
                    
                    // Check if the password matches
                    const isPasswordValid = await user.comparePassword(credentials.password);
                    
                    if (!isPasswordValid) {
                        return null;
                    }
                    
                    // Return the user object (password will be excluded from the session)
                    return {
                        id: user._id.toString(),
                        _id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        isVerified: user.isVerified
                    };
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
                
                // Keep this for testing if needed
                // if (credentials.email === "user@example.com" && credentials.password === "password") {
                //     return {
                //         id: "1",
                //         name: "Demo User",
                //         email: "user@example.com",
                //         isVerified: true
                //     };
                // }
                
                // return null;
            }
        }),
        // Google OAuth authentication
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/account/login",
        signOut: "/",
        error: "/account/login", // Error code passed in query string as ?error=
        verifyRequest: "/account/verify-request", // Used for check email message
        newUser: "/account/register" // New users will be directed here on first sign in
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.usrname = user.usrname;
                // You can add custom user data to the token here
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string;
                session.user.isVerified = token.isVerified as boolean;
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
                session.user.usrname = token.usrname as string;
                // Add any additional user data to the session here
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// Export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
