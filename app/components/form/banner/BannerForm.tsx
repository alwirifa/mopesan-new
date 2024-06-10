"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useBannerModal } from "@/app/hooks/banner/useBannerModal";
import Image from "next/image";

const BannerForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [bannerName, setBannerName] = useState("");
  const [description, setDescription] = useState("");
  const bannerModal = useBannerModal();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.reportValidity()) {
      try {
        const formData = new FormData();
        if (file) {
          formData.append("image", file);
        }
        formData.append(
          "banner",
          JSON.stringify({
            banner_name: bannerName,
            description: description,
          })
        );

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Admin token not found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/banner`,
          formData,
          config
        );
        toast.success("Banner added successfully!");
        bannerModal.onClose();
      } catch (error) {
        toast.error("Failed to add promotional banner");
      }
    }
  };

  return (
    <div className="rounded-lg bg-white">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="py-4 border-t border-b pb-8 border-primary flex gap-4"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <label className="block font-medium leading-6 text-gray-900">
              Banner Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="banner_name"
              value={bannerName}
              required
              onChange={(e) => setBannerName(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="block font-medium leading-6 text-gray-900"
            >
              Description <span className="text-primary">*</span>
            </label>
            <textarea
              rows={3}
              name="description"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Gambar banner</h1>
            <div className="w-24 h-24 border-neutral-300 rounded cursor-pointer">
              <label htmlFor="image" className="cursor-pointer">
                <Image
                  src="/icons/menu/uploadPhoto.svg"
                  alt="Upload Photo"
                  className="-translate-x-1"
                  width={96}
                  height={96}
                />
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {/* {filePreview && (
              <iframe
                src={filePreview}
                className="mt-4 border rounded"
                width="100%"
                height="200px"
                title="Preview"
              />
            )} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
