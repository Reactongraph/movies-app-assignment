"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const Empty = () => {
  const router = useRouter();
  return (
    <div className="h-[calc(100vh_-_118px)] flex items-center justify-center flex-col gap-[40px]">
      <p className="font-mont text-[48px] font-semibold leading-[56px]">
        Your movie list is empty
      </p>
      <button
        class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[202px]"
        onClick={() => router.push("/movies/new")}
      >
        Add a new movie
      </button>
    </div>
  );
};
