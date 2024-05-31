"use client"

import React from 'react';
import Modal from '../Modal';
import { useStaffModal } from '@/app/hooks/staff/useStaffModal';
import StaffForm from '../../form/staff/StaffForm';



const StaffModal = () => {
  const staffModal = useStaffModal()

  const titleContent = (
    <div>
      <h1 className="text-3xl font-semibold">Register New staff</h1>
    </div>
  )

  const bodyContent = (
    <div><StaffForm/></div>
  )
  return (
    <Modal isOpen={staffModal.isOpen} onClose={staffModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default StaffModal;