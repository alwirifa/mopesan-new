"use client"

import React, { useState } from 'react';
import { updateMerchant } from '@/app/lib/actions/merchantsActions' 

const UpdateMerchantForm: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [merchantName, setMerchantName] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLong, setLocationLong] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [picName, setPicName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMerchant(event, params.id, {
      merchant_name: merchantName,
      location_lat: locationLat,
      location_long: locationLong,
      email,
      password,
      phone_number: phoneNumber,
      address,
      pic_name: picName
    });
    // Reset form fields
    setMerchantName('');
    setLocationLat('');
    setLocationLong('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAddress('');
    setPicName('');
  };

  return (
    <div>
      <h1>Update Merchant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="merchant_name">Merchant Name:</label>
          <input
            type="text"
            id="merchant_name"
            value={merchantName}
            onChange={(e) => setMerchantName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location_lat">Location Latitude:</label>
          <input
            type="text"
            id="location_lat"
            value={locationLat}
            onChange={(e) => setLocationLat(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location_long">Location Longitude:</label>
          <input
            type="text"
            id="location_long"
            value={locationLong}
            onChange={(e) => setLocationLong(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pic_name">PIC Name:</label>
          <input
            type="text"
            id="pic_name"
            value={picName}
            onChange={(e) => setPicName(e.target.value)}
          />
        </div>
        <button type="submit">Update Merchant</button>
      </form>
    </div>
  );
};

export default UpdateMerchantForm;
