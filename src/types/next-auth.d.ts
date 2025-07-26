// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "USER" | "RECRUITER" | "ADMIN";
      companyId?: number;
      token: string;
      tokenExpiresAt: string; // Date d'expiration du token
    };
  }
}
