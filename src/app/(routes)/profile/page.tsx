import { auth } from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  // If no session, redirect to home
  if (!session || !session.user?.email) {
    redirect("/");
  }

  // Try to find the profile first
  let profile = await prisma.profile.findFirst({
    where: {
      email: session.user.email,
    },
  });

  // If no profile exists, create one
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        email: session.user.email,
        name: session.user.name || "",
        avatar: session.user.image || "",
        username:
          session.user.name?.toLowerCase().replace(/\s+/g, "") ||
          `user${Date.now()}`,
      },
    });
  }

  return (
    <ProfilePageContent
      ourFollow={null}
      profile={profile}
      isOurProfile={true}
    />
  );
}
