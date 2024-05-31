"use client"

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { deleteAdmin, getAdmin } from "@/app/api/admin";

interface AdminDetailProps {
  params: {
    id: string;
  };
}

const AdminDetailPage: React.FC<AdminDetailProps> = ({ params }) => {
  const [admin, setAdmin] = useState<any>(null);
  const router = useRouter()

  useEffect(() => {
    if (params && params.id) {
      getAdmin(params.id)
        .then((data) => {
          setAdmin(data);
          console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [params]);

  if (!admin) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: number) => {
    router.push(`/dashboard/admin/edit/${id}`);
  };

  return (
    <div>
      <p>Name: {admin.name}</p>
      <p>Email: {admin.email}</p>
      <button onClick={() => deleteAdmin(String(admin.id))}>DELETE</button>
      <button onClick={() => handleEdit(admin.id)}>Edit</button>
    </div>
  );
};

export default AdminDetailPage;

