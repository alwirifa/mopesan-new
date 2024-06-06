"use client";

import React from "react";
import Modal from "../Modal";
import { useBannerModal } from "@/app/hooks/banner/useBannerModal";
import BannerForm from "../../form/banner/BannerForm";

const BannerModal = () => {
  const bannerModal = useBannerModal()

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
      <h1 className="">Register New Promotional Banner</h1>
    </div>
  );

  const bodyContent = (
    <div>
     <BannerForm/>
    </div>
  );
  return (
    <Modal
      isOpen={bannerModal.isOpen}
      onClose={bannerModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={handleSubmit}
      actionLabel="Submit"
    />
  );
};

export default BannerModal;
