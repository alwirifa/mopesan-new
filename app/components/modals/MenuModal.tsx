"use client"

import React from 'react';
import Modal from './Modal';
import { useMenuModal } from '@/app/hooks/useMenuModal';

const MenuModal = () => {
  const menuModal = useMenuModal()

  
  const bodyContent = (
    <div>Modal is Open</div>
  )
  return (
    <Modal isOpen={menuModal.isOpen} onClose={menuModal.onClose} body={bodyContent}/>
  );
};

export default MenuModal;