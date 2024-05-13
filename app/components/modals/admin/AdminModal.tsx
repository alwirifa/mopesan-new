"use client"

import React from 'react';
import Modal from '../Modal';

import AdminForm from '../../form/admin/AdminForm';
import { useAdminModal } from '@/app/hooks/admin/useAdminModal';


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