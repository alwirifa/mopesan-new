"use client"

import React from 'react';
import Modal from './Modal';
import { useMenuModal } from '@/app/hooks/useMenuModal';
import MenuForm from '../form/MenuForm';

const MenuModal = () => {
  const menuModal = useMenuModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Menu</h1>
    </div>
  )

  const bodyContent = (
    <div><MenuForm /></div>
  )
  return (
    <Modal isOpen={menuModal.isOpen} onClose={menuModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default MenuModal;