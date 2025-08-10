import Modal from "@/components/Modal";
import { Suspense } from "react";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";

export default async function PostInModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Modal>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-8">
            <Preloader />
          </div>
        }
      ></Suspense>
      <ModalPostContent postId={id} />
    </Modal>
  );
}
