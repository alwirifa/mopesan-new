"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "@/app/lib/formatter";
import { Switch } from "@/components/ui/switch";

type Notification = {
  id: number;
  name: string;
  description: string;
  condition: string;
  time: string;
  is_active: boolean;
};

type Props = {
  data: Notification[];
};

const Table: React.FC<Props> = ({ data }) => {
  const [notifications, setNotifications] = useState<Notification[]>(data);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setNotifications(data); // Update notifications when data prop changes
  }, [data]);

  const handleNotifSwitch = async (id: number, currentIsActive: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in local storage");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const newIsActive = !currentIsActive;

      // Update the local state for the specific notification item
      const updatedNotifications = notifications.map((item) =>
        item.id === id ? { ...item, is_active: newIsActive } : item
      );

      // Optimistically update the state to avoid delay
      setNotifications(updatedNotifications);

      // Send the API request to update the server
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/events/switch/${id}`,
        { is_active: newIsActive },
        config
      );
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Show loading indicator if data is empty
  if (loading || notifications.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-base font-semibold text-left text-gray-900 bg-[#D6D6D6] border-b border-black">
              <th className="border-r border-black px-2 py-4 text-center">No.</th>
              <th className="border-r border-black px-6 py-4 text-left">Notification Title</th>
              <th className="border-r border-black px-6 py-4 text-left">Deskripsi</th>
              <th className="border-r border-black px-6 py-4 text-left">Kondisi</th>
              <th className="border-r border-black px-6 py-4 text-left">Time Blast</th>
              <th className="border-black px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-t border-r border-black px-4 py-2 font-medium text-center">{index + 1}</td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">{notif?.name}</td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">{notif?.description}</td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">{notif?.condition}</td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">{notif?.time && formatDate(notif?.time)}</td>
                <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                  <Switch
                    checked={notif.is_active}
                    onClick={() => handleNotifSwitch(notif.id, notif.is_active)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
