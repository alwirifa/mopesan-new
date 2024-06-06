"use client";

import React from "react";
import Modal from "../Modal";
import { useFeeModal } from "@/app/hooks/fee/useFeeModal";
import FeeForm from "../../form/fee/FeeForm";

const FeeModal = () => {
  const feeModal = useFeeModal();

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
      <h1 className="text-3xl font-semibold">Register New Additional Fee</h1>
    </div>
  );

  const bodyContent = (
    <div>
      <FeeForm />
    </div>
  );
  return (
    <Modal
      isOpen={feeModal.isOpen}
      onClose={feeModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default FeeModal;
