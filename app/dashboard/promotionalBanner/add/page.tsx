"use client"

import React, { useState } from 'react';
import { createBanner } from '@/app/lib/actions/BannerActions';

const bannerForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bannerName, setBannerName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Add banner</h1>
      <form onSubmit={(e) => createBanner(e, file, bannerName,  description)} encType="multipart/form-data">
        <div>
          <label htmlFor="banner_name">banner Name:</label>
          <input
            type="text"
            id="banner_name"
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
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
        <button type="submit">Add banner</button>
      </form>
    </div>
  );
};

export default bannerForm;
