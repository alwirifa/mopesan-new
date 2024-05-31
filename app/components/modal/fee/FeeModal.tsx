"use client"

import React from 'react';
import Modal from '../Modal';
import { useFeeModal } from '@/app/hooks/fee/useFeeModal';
import FeeForm from '../../form/fee/FeeForm';


const FeeModal = () => {
  const feeModal = useFeeModal()

  const titleContent = (
    <div>
      <h1 className="text-3xl font-semibold">Register New Additional Fee</h1>
    </div>
  )

  const bodyContent = (
    <div><FeeForm/></div>
  )
  return (
    <Modal isOpen={feeModal.isOpen} onClose={feeModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default FeeModal;