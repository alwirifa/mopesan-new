"use client"


import React, { useState } from 'react';
import axios from 'axios';

interface VoucherData {
  voucher_name: string;
  description: string;
  code: string;
  minimum_order: number | undefined;
  valid_from: string;
  valid_until: string;
  merchant_id: number | undefined;
  discount_value: number | undefined;
  type_voucher: string;
  max_discount: number | undefined;
  total_voucher_number: number | undefined;
}

const Page = () => {
  const [formData, setFormData] = useState<VoucherData>({
    voucher_name: '',
    description: '',
    code: '',
    minimum_order: undefined,
    valid_from: '',
    valid_until: '',
    merchant_id: undefined,
    discount_value: undefined,
    type_voucher: '',
    max_discount: undefined,
    total_voucher_number: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('admin_token');
    if (!token) {
      console.error('Admin token not found!');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/vouchers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response:', response.data);
      // Handle success response here
    } catch (error) {
      console.error('Error:', error);
      // Handle error response here
    }
  };

 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="voucher_name"
          placeholder="Voucher Name"
          value={formData.voucher_name}
          onChange={(e) => setFormData({ ...formData, voucher_name: e.target.value })}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
        <input
          type="number"
          name="minimum_order"
          placeholder="Minimum Order"
          value={formData.minimum_order}
          onChange={(e) => setFormData({ ...formData, minimum_order: parseInt(e.target.value) })}
        />
        <input
          type="date"
          name="valid_from"
          placeholder="Valid From"
          value={formData.valid_from}
          onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
        />
        <input
          type="date"
          name="valid_until"
          placeholder="Valid Until"
          value={formData.valid_until}
          onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
        />
        <input
          type="number"
          name="merchant_id"
          placeholder="Merchant ID"
          value={formData.merchant_id}
          onChange={(e) => setFormData({ ...formData, merchant_id: parseInt(e.target.value) })}
        />
        <input
          type="number"
          name="discount_value"
          placeholder="Discount Value"
          value={formData.discount_value}
          onChange={(e) => setFormData({ ...formData, discount_value: parseFloat(e.target.value) })}
        />
        <select
          name="type_voucher"
          value={formData.type_voucher}
          onChange={(e) => setFormData({ ...formData, type_voucher: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        <input
          type="number"
          name="max_discount"
          placeholder="Max Discount"
          value={formData.max_discount}
          onChange={(e) => setFormData({ ...formData, max_discount: parseInt(e.target.value) })}
        />
        <input
          type="number"
          name="total_voucher_number"
          placeholder="Total Voucher Number"
          value={formData.total_voucher_number}
          onChange={(e) => setFormData({ ...formData, total_voucher_number: parseInt(e.target.value) })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
