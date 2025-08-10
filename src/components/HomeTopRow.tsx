import { Follower, Profile } from "@/generated/prisma";
import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";

export default async function HomeTopRow({
  profiles,
}: {
  profiles: Profile[];
}) {
  return (
    <div className="flex md:justify-center gap-3 max-w-full overflow-x-auto">
      <div>
        <button className="size-[92] bg-gradient-to-tr from-igOrange to-igRed text-white rounded-full flex items-center justify-center">
          <PlusIcon size="42" />
        </button>
        <p className="text-center text-gray-400 text-sm">New Story</p>
      </div>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <div className="w-24 flex flex-col justify-center items-center">
            <div>
              <div className="inline-block p-1 bg-gradient-to-tr from-igOrange to-igRed rounded-full">
                <div className="p-0.5 bg-white rounded-full">
                  <Avatar
                    size="6"
                    radius="full"
                    fallback={"avatar"}
                    src={profile.avatar || ""}
                  />
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm">
                {profile.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
