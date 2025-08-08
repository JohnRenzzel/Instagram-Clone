import { Profile } from "@/generated/prisma";
import React from "react";
import Avatar from "@/components/Avatar";
import { format } from "date-fns";

export default function Comment({
  text,
  createdAt,
  authorProfile,
}: {
  text: string;
  createdAt: Date;
  authorProfile?: Profile;
}) {
  return (
    <div className="flex gap-2">
      <div>
        <Avatar src={authorProfile?.avatar || ""} />
      </div>
      <div className="w-full">
        <div className="flex gap-2">
          <div>
            <h3 className="flex gap-1 justify-between">
              {authorProfile?.name}
            </h3>
            <h4 className="text-gray-600 text-sm -mt-1">
              @{authorProfile?.username}
            </h4>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 rounded-md p-4 mt-2 border border-gray-300">
            <p>{text}</p>
          </div>
          <div className="text-xs text-gray-400 text-right">
            {format(createdAt, "MM-dd-yyyy HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
}
