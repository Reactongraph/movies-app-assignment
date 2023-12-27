"use client";
import Footer from "@/components/Footer";
import { MoviesData } from "./data";
import { useGetPostMutation } from "@/store/Features/movies/movieApiSlice";
import { useEffect, useState } from "react";
import { Empty } from "@/components/Common/Empty";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Common/Pagination";
import { signOut } from "next-auth/react";
import { useSnackbar } from "notistack";

export default function Home() {
  const [getPost, { data, isLoading }] = useGetPostMutation();
  const [state, setState] = useState("");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  console.log(data, "data======>");

  const handleLogout = () => {
    signOut();

    enqueueSnackbar("Logout successful", {
      preventDuplicate: true,
      variant: "success",
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  // const getPost = async () => {
  //   try {
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //     const res = await fetch(`${apiUrl}/upload`, {
  //       method: "GET",
  //     });

  //     const dataImage = await res.json();

  //     console.log(dataImage, "dataImage====>");
  //     setState(dataImage.movieData[11]);
  //     if (res.ok) {
  //       // router.push("/");
  //     } else {
  //       throw new Error("Failed to create a movie");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              <div
                className="flex items-center justify-center gap-[12px] cursor-pointer"
                onClick={() => handleLogout()}
              >
                <p class="font-mont text-[16px] font-bold leading-[24px] hidden sm:block">
                  Logout
                </p>
                <img src="/logout.svg" alt="image" />
              </div>
            </div>

            <div className="sm:mt-[120px] mt-[80px] flex sm:gap-[24px] gap-[20px] flex-row flex-wrap justify-center">
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
            <Pagination />
          </main>
        </>
      ) : (
        <Empty />
      )}

      <Footer />
    </>
  );
}
