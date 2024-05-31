"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { UserContext } from "@/app/context/UserContext";
import Image from "next/image";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { setUser, user } = useContext(UserContext);

  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins/login`,
        data,
        { withCredentials: true }
      );

      const token = response.data.data.token;
      const userData = response.data.data.admin.Role;

      console.log("Login Response:", response.data.data);

      setUser(userData);
      console.log("User set in context:", userData);
      localStorage.setItem("token", token);
      toast.success("Login successful!");

      router.push("/dashboard"); // Uncomment this line if you want to navigate to the profile page
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 p-4">
      <div className="flex-1 w-full md:w-1/2">
        <Image
          src="/images/mainBackground.png"
          alt="food background"
          className=" hidden md:flex md:h-screen w-full object-cover"
          height={256}
          width={256}
        />
      </div>
      <div className="flex flex-1 justify-center w-full md:w-1/2">
        <div className="flex flex-col w-full max-w-md rounded-lg pb-6 border-none shadow-custom bg-white">
          <div className="flex flex-col p-10 space-y-1">
            <h3 className="font-semibold tracking-tight text-3xl text-center text-primary">
              MoPesan App!
            </h3>
          </div>
          <form className="p-6 px-8 pt-0 grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-none text-zinc-950"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="example@example.com"
                autoComplete="email"
                className="h-10 w-full border border-primary placeholder:text-primary placeholder:italic rounded-md px-3 py-2 text-sm outline-none placeholder-italic focus:border-maroon"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-none text-zinc-950"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                className="h-10 w-full border border-primary rounded-md px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-maroon pr-10"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <span
                className="absolute inset-y-0 top-5 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </form>
          <div className="p-6 px-8 pt-0 grid gap-4">
            <button
              onClick={loginUser}
              type="button"
              className="w-full py-3 text-sm font-semibold text-white bg-primary rounded-md"
            >
              Login
            </button>
          </div>
          {/* <div className="p-6 px-8 pt-0 grid gap-4">
            <h4>Current User Context:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <p>{user?.role_keyword|| "Role not available"}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
