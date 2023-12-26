"use client";
import React from "react";
import Dropzone from "react-dropzone";

const New = () => {
  return (
    <div className="p-[120px]">
      <p className="font-mont text-[48px] font-semibold mb-[120px]">
        Create a new movie
      </p>
      <div className="flex gap-x-[127px]">
        <Dropzone onDrop={(files) => console.log(files)}>
          {({ getRootProps, getInputProps }) => (
            <div className="max-w-[473px] min-h-[504px] w-full rounded-10 border-2 border-dashed border-white bg-[#224957]">
              <div
                {...getRootProps({
                  onDrop: (event) => event.stopPropagation(),
                })}
                className="max-w-[473px] min-h-[504px] w-full flex items-center justify-center"
              >
                <input
                  {...getInputProps()}
                  className="max-w-[473px] min-h-[504px] w-full"
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
            class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[64px] max-w-[216px]"
            placeholder="Publishing Year"
          />

          <div className="flex gap-x-[16px]">
            <button class="text-white bg-[#093545] hover:bg-[#093545] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px] border border-solid border-white">
              Cancel
            </button>
            <button class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
