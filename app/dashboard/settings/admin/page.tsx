"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminModal } from "@/app/hooks/admin/useAdminModal";
import { useEditAdminModal } from "@/app/hooks/admin/useEditAdminModal";
import { Admin } from "@/app/types/types";
import { getAdmins } from "@/app/api/admin";
import { formatDate } from "@/app/lib/formatter";
import EditAdminModal from "@/app/components/modal/admin/EditAdminModal";
import AdminModal from "@/app/components/modal/admin/AdminModal";
import Heading from "@/app/components/Heading";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useConfirmModal } from "@/app/hooks/confirm/useConfirmModal";
import { Loader2 } from "lucide-react";
import ConfirmModal from "@/app/components/modal/ConfirmModal";

const Page: React.FC = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const adminModal = useAdminModal();
  const confirmModal = useConfirmModal();
  const editAdminModal = useEditAdminModal();
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminsData = await getAdmins();
        setAdmins(adminsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    editAdminModal.onOpen();
  };

  const handleAdminStatusChange = (admin: any) => {
    setSelectedAdmin(admin);
    confirmModal.onOpen();
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in local storage");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const newIsActive = !selectedAdmin.is_active;

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/switch/${selectedAdmin.id}`,
        { is_active: newIsActive },
        config
      );

      setAdmins((prevFees) =>
        prevFees.map((admin) =>
          admin.id === selectedAdmin.id
            ? { ...admin, is_active: newIsActive }
            : admin
        )
      );

      confirmModal.onClose();
    } catch (error) {
      console.error("Error updating fee status:", error);
    }
  };

  // const handleSwitch = async (adminId: number, currentStatus: boolean) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) throw new Error("Token not found in local storage");

  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };

  //     const newStatus = !currentStatus;

  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/switch/${adminId}`,
  //       { is_active: newStatus },
  //       config
  //     );

  //     setAdmins((prevAdmins) =>
  //       prevAdmins.map((admin) =>
  //         admin.id === adminId ? { ...admin, is_active: newStatus } : admin
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating admin status:", error);
  //   }
  // };

  if (!admins) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Admin"
        subtitle="List of all admin"
        buttonTitle="+ Add Admin"
        onButtonClick={adminModal.onOpen}
      />

      <section className="flex gap-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 w-full">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex flex-col gap-2 group relative rounded-lg"
            >
              <div className="flex gap-6 justify-between p-4 items-center rounded-lg bg-white z-40">
                <div>
                  <p className="font-medium">{admin.email}</p>
                  <p className="text-sm text-textGray">
                    Last Login:{" "}
                    <span className="italic">
                      {formatDate(admin.last_login)}
                    </span>
                  </p>
                </div>
                <div>
                  <Switch
                    checked={admin.is_active}
                    onClick={() => handleAdminStatusChange(admin)}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 transition-all group-hover:translate-y-8 duration-300 w-full rounded-xl bg-primary h-full">
                <div className="flex h-full w-full justify-end items-end px-6">
                  <button
                    className="px-4 py-2 text-xs text-white"
                    onClick={() => handleEditAdmin(admin)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <AdminModal />
      <ConfirmModal
        onConfirm={handleConfirm}
        status={selectedAdmin?.is_active}
      />
      {selectedAdmin && <EditAdminModal selectedAdmin={selectedAdmin} />}
    </div>
  );
};

export default Page;
