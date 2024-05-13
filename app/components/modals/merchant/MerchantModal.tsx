"use client"

import React from 'react';
import MenuForm from '../../form/MenuForm';
import Modal from '../Modal';
import { useMerchantModal } from '@/app/hooks/create/useMerchantModal';
import MerchantForm from '../../form/merchant/MerchantForm';


const MerchantModal = () => {
  const merchantModal = useMerchantModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Merchant</h1>
    </div>
  )

  const bodyContent = (
    <div><MerchantForm /></div>
  )
  return (
    <Modal isOpen={merchantModal.isOpen} onClose={merchantModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default MerchantModal;