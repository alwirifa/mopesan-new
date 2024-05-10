"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAdmin } from '@/app/lib/actions/adminActions';

const MerchantForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAdmin(event, {
      name,
      email,
      password,
    });
  };

  const handleClose = () => {
    router.push('/dashboard/admin');
  };

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Add new Admin</h1>
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
              htmlFor="name"
              className="block font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="merchant_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

        </form>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit" className="px-4 py-2 rounded-md bg-bgRed font-semibold text-white">
          Add New Admin
        </button>
      </div>
    </div>
  );
};

export default MerchantForm;
