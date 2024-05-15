"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins/login`,
        data
      );

      console.log("Response data:", response.data);

      // const token = response.data.data.token;

      // save in local
      // localStorage.setItem("admin_token", token);

      // save in cookies
      // document.cookie = `admin_token=${token}; path=/`;

      

      const { token } = response.data.data;
      // const {  permission } = response.data.data.admin

      // Simpan token di localStorage
      localStorage.setItem("admin_token", token);
      // localStorage.setItem("permission", permission)

      // if (permission === "super_admin") {
      //   router.push("/dashboard");
      // } else if (permission === "admin") {
      //   router.push("/tes");
      // } else {
      //   console.error("Invalid permission:", permission);
      // }
      router.push("/dashboard");
      // console.log(permission)
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (

      <div className="h-screen w-full flex justify-center items-center gap-8">
        <div className="flex-1 ">

        <img
          src="/images/mainBackground.png"
          alt="food background"
          className="h-screen w-full p-6 bg-cover"
          />
          </div>
          <div className="flex flex-1 justify-center">

        <div className="flex flex-col w-[450px] rounded-lg pb-6 border-none shadow-custom">
          <div className="flex flex-col p-10 pace-y-1">
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
                className="h-10 w-full border border-primary placeholder:text-primary placeholder:italic rounded-md px-3 py-2 text-sm outline-none  placeholder-italic focus:border-maroon border-maroon"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-none text-zinc-950"
                >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                // placeholder="Enter your password"
                autoComplete="current-password"
                className="h-10 w-full border border-primary rounded-md px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-maroon border-maroon"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                />
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
              </div>
        </div>
      </div>
   
  );
};

export default Login;
