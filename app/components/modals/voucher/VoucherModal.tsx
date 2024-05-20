"use client"

import React from 'react';
import Modal from '../Modal';
import VoucherForm from '../../form/voucher/VoucherForm';
import { useVoucherModal } from '@/app/hooks/voucher/useVoucherModal';


const VoucherModal = () => {
  const voucherModal = useVoucherModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Voucher</h1>
    </div>
  )

  const bodyContent = (
    <div><VoucherForm /></div>
  )
  return (
    <Modal isOpen={voucherModal.isOpen} onClose={voucherModal.onClose} title={titleContent} body={bodyContent}  />
  );
};

export default VoucherModal;