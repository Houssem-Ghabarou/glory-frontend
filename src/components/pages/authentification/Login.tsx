"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo/blacklogo.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import facebookicon from "@/assets/icons/facebook-icon.svg";
import googleicon from "@/assets/icons/google-icon.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl flex flex-col sm:flex-row overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full sm:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <Image src={Logo} alt="Logo" width={120} height={40} />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Please enter your credentials to log in.
          </p>

          <form className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full h-12 px-4 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-black/60"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 flex justify-between">
                Password
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="mt-1 w-full h-12 px-4 text-base border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-black/60"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 text-base bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Right Side - Social */}
        <div className="w-full sm:w-1/2 bg-gray-50 p-10 flex flex-col justify-center gap-5">
          <p className="text-gray-600 text-center text-sm sm:text-base mt-2 py-8">
            Or login with
          </p>

          <button className="h-12 w-full px-4 text-base border border-gray-300 rounded-md flex items-center justify-center gap-3 hover:bg-gray-100 transition">
            <Image src={googleicon} alt="Google" width={20} height={20} />
            <span className="text-gray-700">Continue with Google</span>
          </button>

          <button className="h-12 w-full px-4 text-base border border-gray-300 rounded-md flex items-center justify-center  gap-3 hover:bg-gray-100 transition">
            <Image src={facebookicon} alt="Facebook" width={20} height={20} />
            <span className="text-gray-700 ">Continue with Facebook</span>
          </button>

          <button className="text-sm text-black font-medium hover:underline mt-4">
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
