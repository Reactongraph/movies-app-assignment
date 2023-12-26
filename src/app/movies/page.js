"use client";
import Footer from "@/components/Footer";
import { MoviesData } from "./data";
import { useGetPostMutation } from "@/store/Features/movies/movieApiSlice";
import { useEffect } from "react";
import { Empty } from "@/components/Common/Empty";
import { useRouter } from "next/navigation";

export default function Home() {
  const [getPost, { data, isLoading }] = useGetPostMutation();

  useEffect(() => {
    getPost();
  }, []);

  const router = useRouter();

  return (
    <>
      {MoviesData?.length ? (
        <>
          <main className="p-[120px] mb-[109px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-[12px]">
                <p className="font-mont text-[48px] font-semibold leading-[56px]">
                  My movies
                </p>
                <img
                  src="/addcircle.svg"
                  alt="image"
                  className="cursor-pointer"
                  onClick={() => router.push("/movies/new")}
                />
              </div>
              <div className="flex items-center justify-center gap-[12px]">
                <p className="font-mont text-[16px] font-bold leading-[24px]">
                  Logout
                </p>
                <img src="/logout.svg" alt="image" />
              </div>
            </div>

            <div className="mt-[120px] flex gap-[24px] flex-row flex-wrap justify-center">
              {MoviesData?.map((item, index) => {
                const { poster, publishingyear, title } = item;
                return (
                  <div
                    key={index}
                    className="bg-[#092C39] pt-[8px] px-[8px] pb-[12px] rounded-[8px]"
                  >
                    <img src={poster} className="mb-[16px]" />
                    <p className="font-mont text-[20px] font-medium leading-[32px] mb-[8px]">
                      {title}
                    </p>
                    <p className="font-mont text-[14px] font-normal leading-[32px] mb-[8px]">
                      {publishingyear}
                    </p>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      ) : (
        <Empty />
      )}

      <Footer />
    </>
  );
}
