"use client";

import React from "react";
import Modal from "./Modal";
import { useConfirmModal } from "@/app/hooks/confirm/useConfirmModal";

interface Props {
  onConfirm: () => void;
  status: boolean;
}

const ConfirmModal = ({ onConfirm, status } : Props ) => {
  const confirmModal = useConfirmModal();

  const handleSubmit = () => {
    onConfirm();
    confirmModal.onClose();
  };

  const handleCancel = () => {
    confirmModal.onClose();
  };

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Konfirmasi</h1>
    </div>
  );

  const bodyContent = <div>

    {!status ? (
        <p>Apakah anda ingin mengaktifkan?</p>
    ) : (
      <p>Apakah anda ingin mematikan?</p>
    )}
  </div>;
  return (
    <Modal
      isOpen={confirmModal.isOpen}
      onClose={confirmModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      actionLabel="Konfirmasi"
      cancelLabel="Batal"
    />
  );
};

export default ConfirmModal;
