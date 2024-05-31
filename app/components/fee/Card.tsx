"use client"

import React, { useState, useEffect } from 'react';
import { formatDate } from '@/app/lib/formatter';
import axios from 'axios';
import { Switch } from "@/components/ui/switch";

type Props = {
  last_updated: string;
  value_type: string;
  configuration_name: string;
  value: string | number;
  id: number; // Add id prop
  is_active: boolean;
};

const Card = ({ last_updated, value_type, configuration_name, value, id, is_active }: Props) => {
  const [bgColor, setBgColor] = useState(is_active ? 'bg-primary' : 'bg-[#E3E5E9]'); // Set background color based on is_active
  const [textColor, setTextColor] = useState(is_active ? 'text-white' : 'text-primary'); // Set text color based on is_active
  const [isActive, setIsActive] = useState(is_active); // State for is_active

  useEffect(() => {
    // Set initial background and text colors based on is_active when component mounts
    setBgColor(is_active   ? 'bg-[#E3E5E9]' : 'bg-primary'  );
    setTextColor(is_active ? 'text-primary' : 'text-white'  );
  }, [is_active]);

  const toggleBgColor = async () => { 
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('Token not found in local storage');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Invert is_active state
      const newIsActive = !isActive;
      setIsActive(newIsActive);

      // Send id and new is_active state to the API with Authorization header
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/config-fee/switch/${id}`,
        { is_active: newIsActive },
        config 
      );

      // Toggle background and text colors based on new is_active state
      setBgColor(newIsActive ?    'bg-[#E3E5E9]' : 'bg-primary'  );
      setTextColor(newIsActive ?  'text-primary' : 'text-white'  );
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <div className={`bg-white rounded-lg shadow-custom mt-6 z-40 `}>
        <div className='p-4'>
          <div className='flex justify-between '>
            <p className='italic text-xs text-textGray'>{formatDate(last_updated)}</p>
            <div>
              <div className='px-3 py-1 rounded-full bg-secondary text-primary text-sm'>{value_type}</div>
            </div>
          </div>
          <h1 className='text-xl'>{configuration_name}</h1>
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <p className='italic text-textGray'>Value</p>
          <h1 className='text-3xl font-bold'>{value}</h1>
        </div>
      </div>
      <div className={`z-10 ${textColor} pt-4 px-4 pb-4 -translate-y-2 rounded-b-xl flex justify-between ${bgColor}`}>
        <p className='text-[16px] font-semibold'>Active Status</p>
        <Switch checked={isActive} onClick={toggleBgColor} />
      </div>
    </div>
  );
};

export default Card;
