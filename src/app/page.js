"use client";

import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = React.useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleLogin = async (data) => {
    console.log(data, "data");
    setLoading(true);
    try {
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(signInResponse);

      if (signInResponse && !signInResponse.error) {
        console.log("Sign-in successful");
        router.push("/movies");
      } else {
        // Handle sign-in error
        console.error("Sign-in error:", signInResponse.error);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error during sign-in:", error);
    }
  };
  return (
    <>
      <div className="h-screen flex w-full items-center justify-between flex-col">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="max-w-[300px] w-full h-[calc(100vh_-_118px)] flex flex-col items-center justify-center">
            <p className="font-mont text-[64px] font-semibold leading-[80px] mb-[40px] text-center  ">
              Sign in
            </p>

            <input
              type="text"
              id="email"
              name="email"
              class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[24px]"
              placeholder="Email"
              {...register("email")}
            />

            <input
              type="password"
              id="password"
              name="password"
              class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px] focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full font-mont text-[14px] mb-[24px]"
              placeholder="Password"
              {...register("password")}
            />
            <div class="flex items-center justify-center mb-[24px]">
              <div class="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded-[5px] bg-[#224957] focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <label for="remember" class="ms-2 text-[14px] font-mont">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              class="text-white bg-[#2BD17E] hover:bg-[#2BD17E] font-bold rounded-[10px] text-[16px] w-full text-center py-[15px]"
            >
              Login
            </button>
          </div>
          <Footer />
        </form>
      </div>
    </>
  );
};

export default Login;
