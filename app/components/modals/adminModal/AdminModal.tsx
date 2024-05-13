"use client"

import React from 'react';
import Modal from '../Modal';
import { useAdminModal } from '@/app/hooks/create/useAdminModal';
import AdminForm from '../../form/createForm/AdminForm';


const AdminModal = () => {
  const adminModal = useAdminModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Admin</h1>
    </div>
  )

  const bodyContent = (
    <div><AdminForm/></div>
  )
  return (
    <Modal isOpen={adminModal.isOpen} onClose={adminModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default AdminModal;