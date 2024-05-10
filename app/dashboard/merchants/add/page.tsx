"use client"

import React, { useState } from 'react';
import { createMerchant } from '@/app/lib/actions/merchantsActions';
import { useRouter } from 'next/navigation';

const MerchantForm: React.FC = () => {
  const [merchantName, setMerchantName] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLong, setLocationLong] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [picName, setPicName] = useState('');
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMerchant(event, {
      merchant_name: merchantName,
      location_lat: locationLat,
      location_long: locationLong,
      email,
      password,
      phone_number: phoneNumber,
      address,
      pic_name: picName
    });
  };

  const handleClose = () => {
    router.push('/dashboard/merchants');
  };

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Add new Merchant</h1>
        <div onClick={handleClose} className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
          <img src="/icons/close.svg" alt="close" className="h-full w-full" />
        </div>
      </div>
      <div className="p-4 pb-8 border-b border-t border-bgRed flex gap-4">
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full'
        >
            <div className="flex flex-col gap-2">
            <label
              htmlFor="merchant_name"
              className="block font-medium leading-6 text-gray-900"
            >
              Merchant Name
            </label>
            <input
              type="text"
              id="merchant_name"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
            htmlFor="location_lat"
            className="block font-medium leading-6 text-gray-900"
            >
              Location Latitude
              </label>
            <input
              type="number"
              id="location_lat"
              value={locationLat}
              onChange={(e) => setLocationLat(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
            htmlFor="location_long"
            className="block font-medium leading-6 text-gray-900"
            >
              Location Longitude
              </label>
            <input
              type="number" // Ubah ke type text
              id="location_long"
              value={locationLong}
              onChange={(e) => setLocationLong(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
            htmlFor="email"
            className="block font-medium leading-6 text-gray-900"
            >
              Email
              </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
            htmlFor="password"
            className="block font-medium leading-6 text-gray-900"
            >
              Password
              </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
          <div className="flex flex-col gap-2">
            <label 
            htmlFor="phone_number"
            className="block font-medium leading-6 text-gray-900"
            >
              Phone Number
              </label>
            <input
              type="tel"
              id="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="address"
              className="block font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pic_name"
              className="block font-medium leading-6 text-gray-900"
            >
              PIC Name
            </label>
            <input
              type="text"
              id="pic_name"
              value={picName}
              onChange={(e) => setPicName(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"

            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit" className="px-4 py-2 rounded-md bg-bgRed font-semibold text-white">
          Add New Merchant
        </button>
      </div>
    </div>
  );
};

export default MerchantForm;
