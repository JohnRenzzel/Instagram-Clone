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
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}
