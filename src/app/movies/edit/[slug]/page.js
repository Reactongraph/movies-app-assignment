"use client";
import React from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";

const EditMovie = ({ params }) => {
  const router = useRouter();
  return (
    <div className="sm:px-[120px] sm:py-[120px] px-[24px] py-[80px]">
      <p className="font-mont text-[48px] font-semibold sm:mb-[120px] mb-[80px]">
        Edit
      </p>
      <div className="flex gap-x-[127px] flex-wrap gap-y-[24px] sm:flex-row flex-col-reverse">
        <Dropzone onDrop={(files) => console.log(files)}>
          {({ getRootProps, getInputProps }) => (
            <div className="sm:max-w-[473px] max-w-full min-h-[504px] w-full rounded-10 border-2 border-dashed border-white bg-[#224957]">
              <div
                {...getRootProps({
                  onDrop: (event) => event.stopPropagation(),
                })}
                className="sm:max-w-[473px] max-w-full min-h-[504px] w-full flex items-center justify-center"
              >
                <input
                  {...getInputProps()}
                  className="sm:max-w-[473px] max-w-full min-h-[504px] w-full"
                />
                <div>
                  <div className="w-full flex justify-center">
                    <img src="/filedownload.svg" alt="image" />
                  </div>
                  <p>Drop an image here</p>
                </div>
              </div>
            </div>
          )}
        </Dropzone>

        <div>
          <input
            type="text"
            id="title"
            class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[24px]"
            placeholder="Title"
          />
          <input
            type="text"
            id="publishing_year"
            class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[64px] sm:max-w-[216px] max-w-full"
            placeholder="Publishing Year"
          />

          <div className="gap-x-[16px] hidden sm:flex">
            <button class="text-white bg-[#093545] hover:bg-[#093545] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px] border border-solid border-white">
              Cancel
            </button>
            <button
              class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px]"
              onClick={() => router.push("/movies")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="gap-x-[16px] flex sm:hidden mt-[40px] justify-center">
        <button
          class="text-white bg-[#093545] hover:bg-[#093545] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px] border border-solid border-white"
          onClick={() => router.push("/movies")}
        >
          Cancel
        </button>
        <button class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px]">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditMovie;
