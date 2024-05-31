"use client"

import React from 'react';
import Modal from '../Modal';
import { useEditAdminModal } from '@/app/hooks/admin/useEditAdminModal';
import { Admin } from '@/app/types/types';
import EditAdminForm from '../../form/admin/EditAdminForm';



const EditAdminModal = ({ selectedAdmin }: { selectedAdmin: Admin | null }) => {
  const editAdminModal = useEditAdminModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Edit</h1>
    </div>
  )

  const bodyContent = (
    <div><EditAdminForm selectedAdmin={selectedAdmin} /></div>
  )

  return (
      <Modal isOpen={editAdminModal.isOpen} onClose={editAdminModal.onClose} title={titleContent} body={bodyContent} actionLabel={''} />
  );
};

export default EditAdminModal;
