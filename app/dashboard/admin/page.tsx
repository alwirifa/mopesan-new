"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdmins } from "@/app/lib/actions/adminActions";
import { Admin } from "@/app/lib/types/index";
import { formatDate } from "@/app/lib/formatDate";
import { checkUserToken } from "@/app/lib/tokenChecker";
import { useAdminModal } from "@/app/hooks/create/useAdminModal";

const Page: React.FC = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      checkUserToken();
      try {
        const adminsData = await getAdmins();
        setAdmins(adminsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const addAdmin = () => {
    router.push("/dashboard/admin/add");
  };

  const adminModal = useAdminModal()

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Admins</h1>
          <p>List of Admin</p>
        </div>
        <div>
          {/* <button
            onClick={addAdmin}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Admin
          </button> */}
          <button
            onClick={adminModal.onOpen}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Admin
          </button>
        </div>
      </div>

      <section className="flex gap-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
          {
            admins.map((admin) => (
              <div
                key={admin.id}
                className="flex gap-6 justify-between p-4 items-center border rounded-lg bg-white"
              >
                <div>
                  <p className=" font-medium">{admin.email}</p>
                  <p className="text-sm text-textGray">
                    Last Login:{" "}
                    <span className="italic">
                      {formatDate(admin.last_login)}
                    </span>
                  </p>
                </div>
                <div>
                  <Link
                    href={`/dashboard/admin/${admin.id}`}
                    className="px-8 py-2 rounded-md text-sm text-white bg-bgRed"
                  >
                    Details
                  </Link>
                </div>
              </div>
            )
            )}
        </div>
      </section>
    </div>
  );
};

export default Page;
