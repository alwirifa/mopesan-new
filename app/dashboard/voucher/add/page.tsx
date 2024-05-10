"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createVoucher } from "@/app/lib/actions/voucherAction";
import MerchantPicker from "@/app/ui/dashboard/voucher/MerchantsPicker";

const Page = () => {
  const router = useRouter();
  const [voucherName, setVoucherName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [minimumOrder, setMinimumOrder] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [typeVoucher, setTypeVoucher] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [totalVoucherNumber, setTotalVoucherNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createVoucher(e, {
      voucher_name: voucherName,
      description: description,
      code: code,
      minimum_order: minimumOrder,
      valid_from: validFrom,
      valid_until: validUntil,
      merchant_id: merchantId,
      discount_value: discountValue,
      type_voucher: typeVoucher,
      max_discount: maxDiscount,
      total_voucher_number: totalVoucherNumber,
    });
  };

  const handleClose = () => {
    router.push('/dashboard/voucher');
  };

  const handleMerchantSelect = (merchantId: string | null) => {
    setMerchantId(merchantId ?? '');
  };

  // console.log(merchantId)

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Add new voucher</h1>
        <div onClick={handleClose} className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
          <img src="/icons/close.svg" alt="close" className="h-full w-full" />
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
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>

              <MerchantPicker onMerchantSelect={handleMerchantSelect} />

        

            <div className="flex flex-col gap-2">
              <label className="font-medium">Jenis Potongan</label>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="percentage"
                  name="type_voucher"
                  value="percentage"
                  checked={typeVoucher === "percentage"}
                  onChange={(e) => setTypeVoucher(e.target.value)}
                />
                <p>Persen</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="fixed"
                  name="type_voucher"
                  value="fixed"
                  checked={typeVoucher === "fixed"}
                  onChange={(e) => setTypeVoucher(e.target.value)}
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
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Besar Potongan ..."
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Minimal Pembelian</label>
              <input
                type="number"
                name="minimum_order"
                value={minimumOrder}
                onChange={(e) => setMinimumOrder(e.target.value)}
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
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
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
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
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
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Total Jumlah Voucher</label>
              <input
                type="number"
                name="total_voucher_number"
                placeholder="Total Voucher Number"
                value={totalVoucherNumber}
                onChange={(e) => setTotalVoucherNumber(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bgRed  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
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
