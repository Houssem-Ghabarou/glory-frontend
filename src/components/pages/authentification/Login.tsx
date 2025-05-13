"use client";
import React, { useState } from "react";
import Logo from "@/assets/logo/blacklogo.svg";
import Image from "next/image";
import {
  EyeIcon,
  EyeSlashIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import facebookicon from "@/assets/icons/facebook-icon.svg";
import googleicon from "@/assets/icons/google-icon.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-4 sm:px-80">
      <div className="flex items-center justify-center mb-6">
        <Image
          src={Logo}
          alt="Logo"
          width={150}
          height={50}
          className="h-12 w-auto"
        />
      </div>

      <div className="flex items-center justify-center mb-8">
        <p className="text-2xl font-bold text-black">LOG IN</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg gap-12">
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <label className="text-gray-600 flex justify-center">Login</label>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border-2 border-gray-300 rounded-md p-2 w-full max-w-xs sm:max-w-md"
          />
          <div className="flex items-end justify-between">
            <label className="text-sm text-gray-600">Password</label>
            <button
              onClick={togglePasswordVisibility}
              className="focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="border-2 border-gray-300 rounded-md p-2 w-full max-w-xs sm:max-w-md"
          />
          <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded-full mt-2">
            Login
          </button>
        </div>

        <div className="relative w-full sm:w-auto flex items-center justify-center">
          <div className="hidden sm:block border-l-2 border-gray-300 h-40"></div>
          <span className="absolute bg-white px-2 text-gray-500">OR</span>
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-1/2 items-center text-xs">
          <button className="flex items-center justify-center border border-gray-300 rounded-full p-2 w-full gap-2">
            <Image src={googleicon} alt="" width={24} height={24} />
            Continue with Google
          </button>
          <button className="flex items-center justify-center border border-gray-300 rounded-full p-2 w-full gap-2">
            <Image src={facebookicon} alt="" width={24} height={24} />
            Continue with Facebook
          </button>
          <button className="flex items-center justify-center border border-gray-300 rounded-full p-2 w-full">
            Register
          </button>
        </div>
      </div>

      <div className="mt-6">
        <a href="#" className="text-sm text-gray-600 hover:underline">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default Login;
