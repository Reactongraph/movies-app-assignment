"use client";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import ScreenLoader from "@/components/Common/ScreenLoader";

const EditMovie = ({ params }) => {
  const { slug } = params;

  const { handleSubmit, control, setValue } = useForm();

  const [data, setData] = useState(null);
  const [newImage, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(`${apiUrl}/upload/${slug}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setData(data?.movieData);
        setValue("title", data?.movieData?.title);
        setValue("publishing_year", data?.movieData?.publishing_year);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [slug]);

  if (!data) {
    return (
      <div>
        <ScreenLoader />
      </div>
    );
  }
  const { image } = data;
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!newImage) {
      formData.set("image", image);
    } else {
      const imageBase64 = await convertFileToBase64(newImage);
      formData.set("image", imageBase64);
    }
    formData.set("title", data.title);
    formData.set("publishing_year", data.publishing_year);
    try {
      const res = await fetch(`${apiUrl}/upload/${slug}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        router.push("/movies");
        setImage([]);
        setImagePreview(null);
        enqueueSnackbar("Successfully Updated", {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="font-mont text-[48px] font-semibold sm:mb-[120px] mb-[80px]">
          Edit
        </p>

        <div className="flex gap-x-[127px] flex-wrap gap-y-[24px] sm:flex-row flex-col-reverse">
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
                  />
                  <div>
                    {imagePreview && image.length > 0 ? (
                      <img
                        alt="uploaded"
                        className="max-w-full"
                        src={imagePreview}
                      />
                    ) : (
                      <img
                        src={`data:image/png;base64,${image[0]}`}
                        alt="uploaded"
                        className="max-w-full"
                      />
                    )}

                    <p>Drop an image here</p>
                  </div>
                </div>
              </div>
            )}
          </Dropzone>

          <div>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="title"
                  className="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px] p-2.5 w-full font-mont text-[14px] mb-[24px]"
                  placeholder="Title"
                />
              )}
            />
            <Controller
              name="publishing_year"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="publishing_year"
                  className="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px] p-2.5 w-full font-mont text-[14px] mb-[64px] sm:max-w-[216px] max-w-full"
                  placeholder="Publishing Year"
                />
              )}
            />

            <div className="gap-x-[16px] hidden sm:flex">
              <button class="text-white bg-[#093545] hover:bg-[#093545] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px] border border-solid border-white">
                Cancel
              </button>
              <button
                class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] max-w-[167px]"
                // onClick={() => router.push("/movies")}
                type="submit"
              >
                Save
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
