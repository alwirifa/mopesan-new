"use client"

import React, { useState, useEffect } from 'react';

import { updateMenu } from '@/app/lib/actions/menuActions'; 

const UpdateMenuForm  = ({ params }: { params: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMenu(e, params.id, file, productName, price, description);
    // Reset form fields
    setFile(null);
    setProductName('');
    setPrice('');
    setDescription('');
  };

  return (
    <div>
      <h1>Update Menu</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="product_name">Product Name:</label>
          <input
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
        <button type="submit">Update Menu</button>
      </form>
    </div>
  );
};

export default UpdateMenuForm;