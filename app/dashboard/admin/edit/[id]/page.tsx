"use client"

import React, { useState } from 'react';
import { updateAdmin } from '@/app/lib/actions/adminActions'
import { useRouter } from 'next/navigation';

const UpdateAdminForm = ({ params }: { params: { id: string } }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAdmin(e, params.id, { name, email, password });
      
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Failed to update admin');
    }
  };

  const handleClose = () => {
    router.push('/dashboard/admin');
  };

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Update Admin</h1>
        <div onClick={handleClose} className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
          <img src="/icons/close.svg" alt="close" className="h-full w-full" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" py-4 pb-10  flex flex-col gap-4 w-full border-b border-t border-bgRed ">
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
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-bgRed font-semibold text-white"
          >
           Update Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdminForm;
