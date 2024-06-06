"use client";

import React from "react";
import Modal from "../Modal";
import { useStaffModal } from "@/app/hooks/staff/useStaffModal";
import StaffForm from "../../form/staff/StaffForm";

const StaffModal = () => {
  const staffModal = useStaffModal();

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
      <h1 className="text-3xl font-semibold">Register New staff</h1>
    </div>
  );

  const bodyContent = (
    <div>
      <StaffForm />
    </div>
  );
  return (
    <Modal
      isOpen={staffModal.isOpen}
      onClose={staffModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default StaffModal;
