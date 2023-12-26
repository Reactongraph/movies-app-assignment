import Footer from "@/components/Footer";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="h-screen flex w-full items-center justify-between flex-col">
        <div className="max-w-[300px] w-full h-[calc(100vh_-_118px)] flex flex-col items-center justify-center">
          <p className="font-mont text-[64px] font-semibold leading-[80px] mb-[40px] text-center  ">
            Sign in
          </p>

          <input
            type="text"
            id="email"
            class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px]  p-2.5 w-full font-mont text-[14px] mb-[24px]"
            placeholder="Email"
          />

          <input
            type="password"
            id="password"
            class="bg-[#224957] border border-[#224957] text-white text-sm rounded-[10px] focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full font-mont text-[14px] mb-[24px]"
            placeholder="Password"
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
      </div>
    </>
  );
};

export default Login;
