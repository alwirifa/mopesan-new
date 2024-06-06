"use client";

import React from "react";
import Modal from "../Modal";
import { useNotifModal } from "@/app/hooks/notif/useNotifModal";
import NotifForm from "../../form/notif/NotifForm";

const NotifModal = () => {
  const notifModal = useNotifModal();

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
      <h1 className="text-4xl font-semibold">Register New Promotional Notif</h1>
    </div>
  );

  const bodyContent = (
    <div>
      <NotifForm />
    </div>
  );
  return (
    <Modal
      isOpen={notifModal.isOpen}
      onClose={notifModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default NotifModal;
