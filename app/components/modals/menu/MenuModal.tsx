"use client"

import React from 'react';

import { useMenuModal } from '@/app/hooks/menu/useMenuModal';
import MenuForm from '../../form/menu/MenuForm';
import Modal from '../Modal';


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