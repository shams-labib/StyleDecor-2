import React from "react";
import { Outlet } from "react-router";
import Logo from "../Components/Shared/Logo/Logo";
import logoImg from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-6">
        <Logo />
      </div>

      <div className="flex flex-col md:flex-row items-center min-h-screen gap-10 md:gap-0">
        <div className="flex-1 w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        <div className="flex-1 w-full md:w-[450px] hidden md:flex flex-col items-center">
          <img
            src={logoImg}
            alt="Auth Banner"
            className="w-full h-[420px] object-contain drop-shadow-xl"
          />
          <h1 className="text-4xl font-bold mt-4 text-gray-800 tracking-wide">
            Style Decor
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
