"use client";
import Footer from "@/components/Footer";
import { MoviesData } from "./data";
// import { useGetPostMutation } from "@/store/Features/movies/movieApiSlice";
import { useEffect } from "react";
import { Empty } from "@/components/Common/Empty";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [getPost, { data, isLoading }] = useGetPostMutation();

  // useEffect(() => {
  //   getPost();
  // }, []);

  const router = useRouter();

  return (
    <>
      {MoviesData?.length ? (
        <>
          <main className="sm:px-[120px] sm:py-[120px] px-[20px] py-[80px] mb-[109px] sm:p-[80px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-[12px]">
                <p className="font-mont md:text-[48px] text-[32px] font-semibold leading-[56px] sm:text-[32px]">
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
                <p className="font-mont text-[16px] font-bold leading-[24px] md:d-block d-hidden">
                  Logout
                </p>
                <img src="/logout.svg" alt="image" />
              </div>
            </div>

            <div className="mt-[120px] flex sm:gap-[24px] gap-[20px] flex-row flex-wrap justify-center">
              {MoviesData?.map((item, index) => {
                const { poster, publishingyear, title } = item;
                return (
                  <div
                    key={index}
                    className="bg-[#092C39] pt-[8px] px-[8px] pb-[12px] rounded-[8px] cursor-pointer"
                    onClick={() => router.push(`/movies/edit/${index + 1}`)}
                  >
                    <img
                      src={poster}
                      className="mb-[16px] sm:w-[266px] w-[140px]"
                    />
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
