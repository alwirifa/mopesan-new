"use client"

import React, { useState, useEffect } from 'react';

import { updatebanner } from "@/app/lib/actions/BannerActions"

const UpdatebannerForm  = ({ params }: { params: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [bannerName, setbannerName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatebanner(e, params.id, file, bannerName,  description);
    // Reset form fields
    setFile(null);
    setbannerName('');
    setDescription('');
  };

  return (
    <div>
      <h1>Update banner</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="banner_name">banner Name:</label>
          <input
            type="text"
            id="banner_name"
            value={bannerName}
            onChange={(e) => setbannerName(e.target.value)}
          />
        </div>
     
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Update banner</button>
      </form>
    </div>
  );
};

export default UpdatebannerForm;