"use client";

import React from "react";
import Modal from "../Modal";
import { useEditAdminModal } from "@/app/hooks/admin/useEditAdminModal";
import { Admin } from "@/app/types/types";
import EditAdminForm from "../../form/admin/EditAdminForm";

const EditAdminModal = ({ selectedAdmin }: { selectedAdmin: Admin | null }) => {
  const editAdminModal = useEditAdminModal();

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
      <h1 className="text-4xl font-semibold">Edit Admin {selectedAdmin?.name}</h1>
    </div>
  );

  const bodyContent = (
    <div>
      <EditAdminForm selectedAdmin={selectedAdmin} />
    </div>
  );

  return (
    <Modal
      isOpen={editAdminModal.isOpen}
      onClose={editAdminModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default EditAdminModal;
