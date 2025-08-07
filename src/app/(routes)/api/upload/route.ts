import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.public.file(file, {
      groupId: "7e77f3ef-8423-46b9-9b25-c66372c216c7",
    });
    const cid = uploadData.cid;
    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${cid}`;

    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
