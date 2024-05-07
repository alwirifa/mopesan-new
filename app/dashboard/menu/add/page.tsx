"use client"

import React, { useState } from 'react';
import { createMenu } from '@/app/lib/actions'; // Import the createMenu function

type Menu = {
  product_name: string;
  price: number;
  description: string;
};

const Page: React.FC = () => {
  const [menuData, setMenuData] = useState<Menu>({
    product_name: '',
    price: 0,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the createMenu function from action.ts
    await createMenu(menuData);

    // Optionally clear the form or handle success/error states here
  };

  return (
    <div>
      <h1>Create New Menu</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="product_name"
          value={menuData.product_name}
          onChange={(e) =>
            setMenuData({ ...menuData, product_name: e.target.value })
          }
          required
        />
        <br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={menuData.price}
          onChange={(e) =>
            setMenuData({ ...menuData, price: parseFloat(e.target.value) })
          }
          required
        />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={menuData.description}
          onChange={(e) =>
            setMenuData({ ...menuData, description: e.target.value })
          }
          required
        />
        <br />

        <button type="submit">Create Menu</button>
      </form>
    </div>
  );
};

export default Page;
