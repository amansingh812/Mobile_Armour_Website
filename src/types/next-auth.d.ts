// src/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string
        isVerified?: boolean
        isAcceptingMessages?: boolean
        usrname?: string
        email?: string | null;
        image?: string | null;
        phone?: string | null;
    }
    interface Session {
        user: {
            _id?: string
            isVerified?: boolean
            isAcceptingMessages?: boolean
            usrname?: string
            email?: string | null;
            image?: string | null;
            phone?: string | null;
        } & DefaultSession['user']
    }
}

export default authOptions


