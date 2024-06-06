"use client";

import React from "react";
import MenuForm from "../../form/menu/MenuForm";
import Modal from "../Modal";

import MerchantForm from "../../form/merchant/MerchantForm";
import { useMerchantModal } from "@/app/hooks/merchant/useMerchantModal";

const MerchantModal = () => {
  const merchantModal = useMerchantModal();

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
      <h1 className="text-3xl font-semibold">Register New Merchant</h1>
    </div>
  );

  const bodyContent = (
    <div>
      <MerchantForm />
    </div>
  );

  return (
    <Modal
      isOpen={merchantModal.isOpen}
      onClose={merchantModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default MerchantModal;
