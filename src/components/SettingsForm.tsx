"use client";
import { updateProfile } from "@/actions";
import { Profile } from "@/generated/prisma";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({
  userEmail,
  profile,
}: {
  userEmail: string;
  profile: Profile;
}) {
  const router = useRouter();

  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    profile.avatar ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((url) => {
          setAvatarUrl(url);
        });
      });
    }
  }, [file]);
  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data, userEmail);
        router.push("/profile");
        router.refresh();
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl} />
      <div className="flex gap-4 items-center">
        <div>
          <div className="bg-gray-400 overflow-hidden size-24 rounded-full aspect-square shadow-md shadow-gray-400 ">
            {avatarUrl && (
              <img className="" src={avatarUrl} alt="User avatar" />
            )}
          </div>
        </div>
        <div>
          <input
            type="file"
            ref={fileInRef}
            className="hidden"
            onChange={(ev) => setFile(ev.target.files?.[0] ?? null)}
          />
          <Button
            type="button"
            variant="surface"
            onClick={() => fileInRef.current?.click()}
          >
            <CloudUploadIcon />
            Change avatar
          </Button>
        </div>
      </div>
      <p className="mt-2 font-bold">username</p>
      <TextField.Root
        defaultValue={profile.username || ""}
        name="username"
        placeholder="username"
      />
      <p className="mt-2 font-bold">name</p>
      <TextField.Root
        defaultValue={profile.name || ""}
        name="name"
        placeholder="Sofia Bugias"
      />
      <p className="mt-2 font-bold">subtitle</p>
      <TextField.Root
        defaultValue={profile.subtitle || ""}
        name="subtitle"
        placeholder="Fashion Model"
      />
      <p className="mt-2 font-bold">bio</p>
      <TextArea defaultValue={profile.bio || ""} name="bio" />
      <div className="mt-2 flex justify-center">
        <Button variant="solid">Save Settings</Button>
      </div>
    </form>
  );
}
