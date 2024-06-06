"use client";

import React, { useState } from "react";
import { createMerchant } from "@/app/api/merhchant";
import { useMerchantModal } from "@/app/hooks/merchant/useMerchantModal";

const MerchantForm: React.FC = () => {
  const [merchantName, setMerchantName] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLong, setLocationLong] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [picName, setPicName] = useState("");
  const merchantModal = useMerchantModal();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.reportValidity()) {
      createMerchant(event, {
        merchant_name: merchantName,
        location_lat: locationLat,
        location_long: locationLong,
        email,
        password,
        opening_hours: openingTime,
        closing_hours: closingTime,
        phone_number: phoneNumber,
        address,
        pic_name: picName,
      });
      merchantModal.onClose();
    }
  };

  const hours24: string[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    hours24.push(`${hour}:00:00`);
  }

  return (
    <div className="p rounded-lg bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-6 w-full border-t border-b border-primary py-6 ">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="merchant_name"
                className="block font-medium leading-6 text-gray-900"
              >
                Merchant Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="merchant_name"
                placeholder="Contoh: Koruruk Jagakarsa"
                value={merchantName}
                required
                onChange={(e) => setMerchantName(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="address"
                className="block font-medium leading-6 text-gray-900"
              >
                Merchant Address <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Contoh: Mercu Barat no 87, Jakarta Selatan ..."
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="address"
                className="block font-medium leading-6 text-gray-900"
              >
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="opening_time"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Opening Hours <span className="text-primary">*</span>
                </label>
                <select
                  id="opening_hour" // Properti id untuk opening hours
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6"
                >
                  {hours24.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="closing_time"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Closing Hours <span className="text-primary">*</span>
                </label>
                <select
                  id="closing_hour" // Properti id untuk closing hours
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6"
                >
                  {hours24.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone_number"
                className="block font-medium leading-6 text-gray-900"
              >
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="phone_number"
                value={phoneNumber}
                required
                placeholder="Contoh: 0812 0812 0812"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end"></div>
        </div>
      </form>
    </div>
  );
};

export default MerchantForm;
