"use client";

import { createFee } from "@/app/api/fee";
import { useFeeModal } from "@/app/hooks/fee/useFeeModal";
import React, { useState } from "react";

const FeeForm: React.FC = () => {
  const [feeName, setFeeName] = useState("");
  const [description, setDescription] = useState("");
  const [potonganType, setPotonganType] = useState<string>("fixed");
  const [value, setValue] = useState("");
  const feeModal = useFeeModal();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.reportValidity()) {
      createFee(event, {
        configuration_name: feeName,
        value_type: potonganType,
        description: description,
        value: value,
      });
      feeModal.onClose();
    }
  };

  return (
    <div className="p rounded-lg bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-6 w-full border-t border-b border-primary py-6 ">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fee_name"
                className="block font-medium leading-6 text-gray-900"
              >
                Additional Fee Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="fee_name"
                placeholder="Additional Fee Name"
                value={feeName}
                required
                onChange={(e) => setFeeName(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="potongan"
                className="block font-medium leading-6 text-gray-900"
              >
                Jenis Potongan <span className="text-primary">*</span>
              </label>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="fixed"
                  name="potonganType"
                  value="fixed"
                  required
                  checked={potonganType === "fixed"}
                  onChange={(e) => setPotonganType(e.target.value)}
                />
                <label htmlFor="fixed">Fixed</label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="percentage"
                  name="potonganType"
                  required
                  value="percentage"
                  checked={potonganType === "percentage"}
                  onChange={(e) => setPotonganType(e.target.value)}
                />
                <label htmlFor="percentage">Percentage</label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="value"
                className="block font-medium leading-6 text-gray-900"
              >
                Value <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                id="value"
                placeholder="Contoh 10.000 or 11%"
                value={value}
                required
                onChange={(e) => setValue(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
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
                id="description"
                placeholder="Notification Description ..."
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end"></div>
        </div>
      </form>
    </div>
  );
};

export default FeeForm;
