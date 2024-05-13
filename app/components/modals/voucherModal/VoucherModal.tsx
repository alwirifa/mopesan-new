"use client"

import React from 'react';
import { useMenuModal } from '@/app/hooks/useMenuModal';
import MenuForm from '../../form/MenuForm';
import Modal from '../Modal';
import { useVoucherModal } from '@/app/hooks/useVoucherModal';


const VoucherModal = () => {
  const voucherModal = useVoucherModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Voucher</h1>
    </div>
  )

  const bodyContent = (
    <div><MenuForm /></div>
  )
  return (
    <Modal isOpen={voucherModal.isOpen} onClose={voucherModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default VoucherModal;