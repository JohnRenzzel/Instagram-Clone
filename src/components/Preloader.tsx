"use client";
import { ScaleLoader } from "react-spinners";

export default function Preloader() {
  return (
    <div className="flex justify-center pt-8">
      <ScaleLoader color="#aaa" loading={true} speedMultiplier={4} />
    </div>
  );
}
