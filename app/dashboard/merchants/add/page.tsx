"use client"

// components/MerchantForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

const MerchantForm: React.FC = () => {
  const [formData, setFormData] = useState({
    merchant_name: '',
    location_lat: 0.0,
    location_long: 0.0,
    email: '',
    password: '',
    phone_number: '',
    address: '',
    pic_name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'location_lat' || name === 'location_long' ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('Admin token not found');
      }

      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setFormData({
        merchant_name: '',
        location_lat: 0.0,
        location_long: 0.0,
        email: '',
        password: '',
        phone_number: '',
        address: '',
        pic_name: ''
      });
    } catch (error) {
      console.error('Error adding merchant:', error);
    }
  };

  return (
    <div>
      <h1>Add Merchant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="merchant_name">Merchant Name:</label>
          <input
            type="text"
            id="merchant_name"
            name="merchant_name"
            value={formData.merchant_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location_lat">Location Latitude:</label>
          <input
            type="number"
            id="location_lat"
            name="location_lat"
            value={formData.location_lat}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location_long">Location Longitude:</label>
          <input
            type="number"
            id="location_long"
            name="location_long"
            value={formData.location_long}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pic_name">PIC Name:</label>
          <input
            type="text"
            id="pic_name"
            name="pic_name"
            value={formData.pic_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Merchant</button>
      </form>
    </div>
  );
};

export default MerchantForm;
