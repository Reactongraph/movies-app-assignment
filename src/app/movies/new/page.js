"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";

const New = () => {
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    const formData = new FormData();

    const imageBase64 = await convertFileToBase64(image);

    formData.set("image", imageBase64);
    formData.set("title", data.title);
    formData.set("publishing_year", data.publishing_year);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // router.push("/");
        reset();
        setImage([]);
        setImagePreview(null);
        enqueueSnackbar("Successfully uploaded", {
          preventDuplicate: true,
          variant: "success",
        });
      } else {
        throw new Error("Failed to create a movie");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="sm:px-[120px] sm:py-[120px] px-[24px] py-[80px]">
      <p className="font-mont text-[48px] font-semibold sm:mb-[120px] mb-[80px]">
        Create a new movie
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-[127px] flex-wrap gap-y-[24px] sm:flex-row flex-col-reverse">
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Dropzone
                onDrop={(files) => {
                  setImage(files[0]);
                  setImagePreview(URL.createObjectURL(files[0]));
                }}
              >
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
                        {...field}
                      />
                      <div>
                        <div className="w-full flex justify-center">
                          {!imagePreview && (
                            <img src="/filedownload.svg" alt="image" />
                          )}
                        </div>
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="image preview"
                            className="max-w-full h-auto"
                          />
                        )}
                        <p>Drop an image here</p>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
            )}
          />
          <div>
            <input
              type="text"
              id="title"
              class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[24px]"
              placeholder="Title"
              {...register("title")}
            />
            <input
              type="text"
              id="publishing_year"
              class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[64px] sm:max-w-[216px] max-w-full"
              placeholder="Publishing Year"
              {...register("publishing_year")}
            />

            <div className="gap-x-[16px] hidden sm:flex">
              <button
                class="text-white bg-[#093545] hover:bg-[#093545] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px] border border-solid border-white"
                onClick={() => router.push("/movies")}
              >
                Cancel
              </button>
              <button
                type="submit"
                class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px]"
              >
                save
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
          <button
            type="submit"
            class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px]"
          >
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
