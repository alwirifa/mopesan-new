"use client";

import React, { useState } from 'react';
import axios from 'axios';

const BannerForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bannerName, setBannerName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const createBanner = async (
    event: React.FormEvent<HTMLFormElement>,
    file: File | null,
    bannerName: string,
    description: string
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      }
      formData.append(
        'banner',
        JSON.stringify({
          banner_name: bannerName,
          description: description
        })
      );

      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('Admin token not found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/banner`, formData, config);
      alert('Banner added successfully!');
    } catch (error) {
      console.error('Error adding banner:', error);
      alert('Failed to add banner');
    }
  };

  return (
    <div className="rounded-lg bg-white">
      <form onSubmit={(e) => createBanner(e, file, bannerName, description)} encType="multipart/form-data" className="py-4 border-t border-primary flex gap-4">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <label className="block font-medium leading-6 text-gray-900">
              Banner Name
            </label>
            <input
              type="text"
              id="banner_name"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="block font-medium leading-6 text-gray-900">
              Description
            </label>
            <textarea
              rows={3}
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="block font-medium leading-6 text-gray-900">
              Image
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-sm font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:bg-primary file:text-white file:px-3 file:py-[0.32rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              type="file"
              id="image"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="px-4 py-2 rounded-md bg-primary font-semibold text-white">
              Add New Banner
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
