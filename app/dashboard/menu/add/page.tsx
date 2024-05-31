"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMenu } from '@/app/api/menu';

const MenuForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleClose = () => {
    router.push('/dashboard/menu');
  };

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Add new Menu</h1>
        <div onClick={handleClose} className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
          <img src="/icons/close.svg" alt="close" className="h-full w-full" />
        </div>
      </div>
      <div className="p-4 pb-8 border-b border-t border-bgRed flex gap-4">
        <form
          onSubmit={(e) => createMenu(e, file, productName, price, description)}
          encType="multipart/form-data"
          className='flex flex-col gap-6 w-full'
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="product_name"
              className="block font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="block font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="block font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <textarea
              rows={3}
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0  px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="block font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-sm font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-bgRed file:text-white file:px-3 file:py-[0.32rem] file: file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-nonedark :file:text-neutral-100 " />
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit" className="px-4 py-2 rounded-md bg-bgRed font-semibold text-white">
          Add New Menu
        </button>
      </div>
    </div>
  );
};

export default MenuForm;
