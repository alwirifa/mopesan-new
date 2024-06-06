"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAdmin } from "@/app/api/admin";
import axios from "axios";
import { useAdminModal } from "@/app/hooks/admin/useAdminModal";
import toast from "react-hot-toast";

const AdminForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleID, setRoleID] = useState("");
  const [merchantID, setMerchantID] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [adminMerchants, setAdminMerchants] = useState<any[]>([]);
  const router = useRouter();
  const adminModal = useAdminModal();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;

    if (form.reportValidity()) {
      try {
        await createAdmin({
          name,
          email,
          password,
          roleID,
          merchantID,
        });
        toast.success("Admin added successfully!");
        adminModal.onClose();
      } catch (error) {
        console.error("Error creating admin:", error);
        toast.error("Failed to add admin. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/roles`
        );

        const data = response.data.data;
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const fetchAdminMerchants = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins/admin-merchants`
        );
        const data = response.data.data;
        setAdminMerchants(data);
      } catch (error) {
        console.error("Error fetching admin merchants:", error);
      }
    };

    fetchRoles();
    fetchAdminMerchants();
  }, []);
  console.log(roleID);

  return (
    <div className="rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        <div className="py-4 pb-10 flex flex-col gap-4 w-full border-b border-t border-primary">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-name"
              className="block font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="admin-name"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-email"
              className="block font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="admin-email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-password"
              className="block font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="admin-password"
              placeholder="Password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="admin-roleID"
              className="block font-medium leading-6 text-gray-900"
            >
              Role ID
            </label>
            <select
              id="admin-roleID"
              value={roleID}
              onChange={(e) => setRoleID(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6"
            >
              {roles.map((role, index) => (
                <option key={index} value={role.role_id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          {roleID !== "3" && ( // Ganti "admin_finance" dengan nilai yang sesuai
            <div className="flex flex-col gap-2">
              <label
                htmlFor="admin-merchantID"
                className="block font-medium leading-6 text-gray-900"
              >
                Merchant ID
              </label>
              <select
                id="admin-merchantID"
                value={merchantID}
                onChange={(e) => setMerchantID(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6"
              >
                {adminMerchants.map((merchant) => (
                  <option
                    key={merchant.merchant_id}
                    value={merchant.merchant_id}
                  >
                    {merchant.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
