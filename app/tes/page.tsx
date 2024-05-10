"use client"

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getMerchants } from '../lib/actions/merchantsActions';
import { Merchant } from '@/app/lib/types/index';

export default function MerchantPicker() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchantsData = await getMerchants();
        setMerchants(merchantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const handleMerchantSelect = (selectedOption: any) => {
    setSelectedMerchantId(selectedOption ? selectedOption.value : null);
  };

  // Map merchants to options compatible with Select component
  const merchantOptions = [
    { value: '0', label: 'Semua Merchant' }, // Option for "Semua Merchant"
    ...merchants.map(merchant => ({
      value: merchant.id,
      label: merchant.merchant_name // Ensure merchant_name is used for the label
    }))
  ];

  console.log(selectedMerchantId)

  return (
    <div className="mx-auto container py-8">
      <h1 className="text-sm">Select Merchant</h1>
      <div className="flex flex-wrap items-center lg:justify-between justify-center">
        <div className="px-2">
          <Select
            options={merchantOptions}
            isClearable={true}
            instanceId="my-unique-id"
            getOptionValue={(merchant) => merchant.value.toString()} // Set input ID to merchant ID
            onChange={handleMerchantSelect}
          />
        </div>
      </div>
      <div>
        <p>Selected Merchant ID: {selectedMerchantId}</p>
      </div>
    </div>
  );
}

