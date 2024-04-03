"use client";

import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { validationRules } from "@/utlils/validation";
import { useSnackbar } from "notistack";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      const signInResponse = await fetch(`${apiUrl}/signin/`, {
        method: "POST",
        body: JSON.stringify(data), // Make sure to stringify the data if it's an object
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
      });
      if (signInResponse.ok) {
        console.log("sign in successful", signInResponse);
        enqueueSnackbar("sign in successful", {
          preventDuplicate: true,
          variant: "success",
        });
        router.push("/");
        // Redirect or perform any other actions upon successful sign-in
      } else {
        const responseData = await signInResponse.json();
        // Handle sign-in error
        console.error("Sign-in error:", responseData.error);
        enqueueSnackbar("Use another Email Id, Already exist", {
          preventDuplicate: true,
          variant: "error",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error during sign-in:", error);
    }
  };
  return (
    <>
      <div className="h-screen flex w-full items-center justify-between flex-col">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="max-w-[300px] w-full px-2 sm:px-0"
        >
          <div className="max-w-[300px] w-full h-[calc(100vh_-_118px)] flex flex-col items-center justify-center">
            <p className="font-mont sm:text-[64px] text-[48px] font-semibold leading-[80px] mb-[40px] text-center  ">
              Sign in
            </p>

            <div className="mb-[24px] w-full">
              <input
                type="text"
                id="email"
                name="email"
                class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] "
                placeholder="Email"
                {...register("email", validationRules.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-mont mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-[24px] w-full">
              <input
                type="password"
                id="password"
                name="password"
                class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px] focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full font-mont text-[14px]"
                placeholder="Password"
                {...register("password", validationRules.password)}
              />

              {errors.password && (
                <p className="text-red-500 text-sm font-mont mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px] cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
