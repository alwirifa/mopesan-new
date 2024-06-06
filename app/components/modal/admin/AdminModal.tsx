"use client";

import React from "react";
import Modal from "../Modal";
import AdminForm from "../../form/admin/AdminForm";
import { useAdminModal } from "@/app/hooks/admin/useAdminModal";

const AdminModal = () => {
  const adminModal = useAdminModal();

  const handleSubmit = () => {
    const formElement = document.querySelector("form");
    if (formElement) {
      formElement.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Register New Admin</h1>
    </div>
  );

  const bodyContent = (
    <div>
      <AdminForm />
    </div>
  );
  return (
    <Modal
      isOpen={adminModal.isOpen}
      onClose={adminModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default AdminModal;
