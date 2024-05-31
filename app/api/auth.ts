import axios from "axios";
import { toast } from "react-hot-toast";
import { NextRouter } from "next/router";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData, router: NextRouter) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins/login`,
      data,
      { withCredentials: true }
    );

    toast.success("Login successful!");

    router.push("/tes2");
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error(
      "Login failed. Please check your credentials and try again."
    );
  }
};
