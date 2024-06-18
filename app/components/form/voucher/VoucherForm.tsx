"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createVoucher } from "@/app/api/voucher";
import { useVoucherModal } from "@/app/hooks/voucher/useVoucherModal";

const Page = () => {
  const router = useRouter();
  const [voucherName, setVoucherName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [typeVoucher, setTypeVoucher] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [totalVoucherNumber, setTotalVoucherNumber] = useState("");
  const voucherModal = useVoucherModal();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.reportValidity()) {
      createVoucher(event, {
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
      voucherModal.onClose();
    }
  };

  const handleClose = () => {
    router.push("/dashboard/voucher");
  };

  const handleMerchantSelect = (merchantId: string | null) => {
    setMerchantId(merchantId ?? "");
  };


  return (
    <div className="rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        <div className="py-6 pb-8 border-b border-t border-primary flex gap-4">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Voucher Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="voucher_name"
                placeholder="Voucher Name"
                required
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="about"
                className="block font-medium leading-6 text-gray-900"
              >
                Voucher Description <span className="text-primary">*</span>
              </label>

              <textarea
                rows={3}
                name="description"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0  px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Voucher Code Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="code"
                required
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>

            {/* <MerchantPicker label="Select Merchant" onMerchantSelect={handleMerchantSelect} /> */}

            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Jenis Potongan <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="percentage"
                  name="type_voucher"
                  value="percentage"
                  required
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
                  required
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
                Besar Potongan (Fixed / Persen){" "}
                <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                name="discount_value"
                value={discountValue}
                required
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Besar Potongan ..."
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Minimal Pembelian <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                name="minimum_order"
                value={minimumOrder}
                required
                onChange={(e) => setMinimumOrder(e.target.value)}
                placeholder="Minimal Pembelian ..."
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Maksimal Potongan <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                name="max_discount"
                placeholder="Max Discount"
                value={maxDiscount}
                required
                onChange={(e) => setMaxDiscount(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Valid From <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                name="valid_from"
                placeholder="Valid From"
                value={validFrom}
                required
                onChange={(e) => setValidFrom(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block font-medium leading-6 text-gray-900">
                Valid Until <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                name="valid_until"
                placeholder="Valid Until"
                value={validUntil}
                required
                onChange={(e) => setValidUntil(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                Total Jumlah Voucher <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                name="total_voucher_number"
                placeholder="Total Voucher Number"
                value={totalVoucherNumber}
                required
                onChange={(e) => setTotalVoucherNumber(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
