"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const Empty = () => {
  const router = useRouter();
  return (
    <div className="h-[calc(100vh_-_118px)] flex items-center justify-center flex-col gap-[40px] px-[20px]">
      <p className="font-mont text-[32px] font-semibold sm:leading-[56px] leading-[40px] sm:text-[40px] text-center">
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
