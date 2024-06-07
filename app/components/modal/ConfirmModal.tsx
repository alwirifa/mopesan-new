"use client";

import React from "react";
import Modal from "./Modal";
import { useConfirmModal } from "@/app/hooks/confirm/useConfirmModal";

const ConfirmModal = () => {
  const confirmModal = useConfirmModal();

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
      <h1 className="text-4xl font-semibold">Konfimari Penonaktifan</h1>
    </div>
  );

  const bodyContent = <div>Apakah anda ingin mematikan?</div>;
  return (
    <Modal
      isOpen={confirmModal.isOpen}
      onClose={confirmModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default ConfirmModal;
