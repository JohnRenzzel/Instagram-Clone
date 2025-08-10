"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <>
      {/* Desktop Modal */}
      <div
        onClick={() => router.back()}
        className="hidden md:block bg-black/80 dark:bg-gray-700/70 fixed inset-0 z-20"
      >
        <div className="left-8 right-8 top-9 bottom-9 absolute flex items-center">
          <div
            style={{ maxHeight: "calc(100vh - 4.5rem)" }}
            className="bg-white py-4 dark:bg-gray-800 rounded-lg overflow-y-auto"
          >
            <div className="z-30 rounded-lg">
              <div onClick={(ev) => ev.stopPropagation()} className="px-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Full Page */}
      <div className="block md:hidden fixed inset-0 z-20 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}
