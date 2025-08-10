import { auth } from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email as string,
    },
  });
  return (
    <ProfilePageContent
      ourFollow={null}
      profile={profile}
      isOurProfile={true}
    />
  );
}
