import axios from "axios";
import toast from "react-hot-toast";

export const createNotification = async (
  event: React.FormEvent<HTMLFormElement>,
  feeData: {
    name: string;
    description: string;
    day_in_month: string;
    is_active: boolean;
    time: string;
  }
) => {
  event.preventDefault();
  try {
    const { is_active, description, name, time, day_in_month } = feeData;

    const requestData = {
      name,
      description,
      is_active,
      time,
      day_in_month: parseFloat(day_in_month),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/events`,
      requestData,
      config
    );
    toast.success("Blast Notification added successfully");
  } catch (error) {
    toast.error("Failed to add blast notification");
  }
};
