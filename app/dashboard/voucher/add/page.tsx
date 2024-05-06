"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface VoucherData {
  voucher_name: string;
  description: string;
  code: string;
  minimum_order: number;
  valid_from: string;
  valid_until: string;
  merchant_id: number;
  discount_value: number;
  type_voucher: string;
  max_discount: number;
  total_voucher_number: number;
}

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<VoucherData>({
    voucher_name: "",
    description: "",
    code: "",
    minimum_order: 0,
    valid_from: "",
    valid_until: "",
    merchant_id: 0,
    discount_value: 0,
    type_voucher: "",
    max_discount: 0,
    total_voucher_number: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("admin_token");
    if (!token) {
      console.error("Admin token not found!");
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

      console.log("Response:", response.data);
      // Handle success response here
    } catch (error) {
      console.error("Error:", error);
      // Handle error response here
    }
  };

  const handleClose = () => {
    router.push('/dashboard/voucher')
  }

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Add new voucher</h1>
        <div onClick={handleClose} className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
          <img src="/icons/close.svg" alt="close"  className="h-full w-full"/>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-4 border-b border-t border-bgRed flex gap-4">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Voucher Name
              </label>
              <input
                type="text"
                name="voucher_name"
                placeholder="Voucher Name"
                value={formData.voucher_name}
                onChange={(e) =>
                  setFormData({ ...formData, voucher_name: e.target.value })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="about"
                className="block font-medium leading-6 text-gray-900"
              >
                Voucher Description
              </label>

              <textarea
                rows={3}
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="block w-full rounded-md border-0  px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Voucher Code Name
              </label>
              <input
                type="text"
                name="code"
                placeholder="Code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Merhant ID
              </label>
              <input
                type="number"
                name="merchant_id"
                placeholder="Merchant ID"
                value={formData.merchant_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    merchant_id: parseInt(e.target.value),
                  })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
           
            <div className="flex flex-col gap-2">
              <label className="font-medium">Jenis Potongan</label>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="percentage"
                  name="type_voucher"
                  value="percentage"
                  checked={formData.type_voucher === "percentage"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type_voucher: e.target.value,
                    })
                  }
                />
                <p>Persen</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="fixed"
                  name="type_voucher"
                  value="fixed"
                  checked={formData.type_voucher === "fixed"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type_voucher: e.target.value,
                    })
                  }
                />
                <p>Fixed</p>
              </div>
            </div>

         
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Besar Potongan (Fixed / Persen)
              </label>
              <input
                type="number"
                name="discount_value"
                value={formData.discount_value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discount_value: parseFloat(e.target.value),
                  })
                }
                placeholder="Besar Potongan ..."
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Minimal Pembelian</label>
              <input
                type="number"
                name="minimum_order"
                value={formData.minimum_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimum_order: parseInt(e.target.value),
                  })
                }
                placeholder="Minimal Pembelian ..."
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Maksimal Potongan</label>
              <input
                type="number"
                name="max_discount"
                placeholder="Max Discount"
                value={formData.max_discount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    max_discount: parseInt(e.target.value),
                  })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Valid From
              </label>
              <input
                type="date"
                name="valid_from"
                placeholder="Valid From"
                value={formData.valid_from}
                onChange={(e) =>
                  setFormData({ ...formData, valid_from: e.target.value })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Valid Until
              </label>
              <input
                type="date"
                name="valid_until"
                placeholder="Valid Until"
                value={formData.valid_until}
                onChange={(e) =>
                  setFormData({ ...formData, valid_until: e.target.value })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Total Jumlah Voucher</label>
              <input
                type="number"
                name="total_voucher_number"
                placeholder="Total Voucher Number"
                value={formData.total_voucher_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_voucher_number: parseInt(e.target.value),
                  })
                }
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <input />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-bgRed text-white"
          >
            Add New Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
