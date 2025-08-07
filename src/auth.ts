import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email) {
        try {
          // Check if profile exists, create if it doesn't
          const existingProfile = await prisma.profile.findUnique({
            where: { email: user.email },
          });

          if (!existingProfile) {
            await prisma.profile.create({
              data: {
                email: user.email,
                name: user.name || "",
                avatar: user.image || "",
                username: user.email?.split("@")[0] || "", // Use email prefix as default username
              },
            });
          }
        } catch (error) {
          console.error("Error creating profile:", error);
          return false; // This will prevent sign in if profile creation fails
        }
      }
      return true;
    },
  },
});
