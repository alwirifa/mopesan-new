"use client"

import React from 'react';
import { useMenuModal } from '@/app/hooks/useMenuModal';
import MenuForm from '../../form/MenuForm';
import Modal from '../Modal';
import { useBannerModal } from '@/app/hooks/useBannerModal';
import BannerForm from '../../form/BannerForm';


const BannerModal = () => {
  const bannerModal = useBannerModal()

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Promotional Banner</h1>
    </div>
  )

  const bodyContent = (
    <div><BannerForm /></div>
  )
  return (
    <Modal isOpen={bannerModal.isOpen} onClose={bannerModal.onClose} title={titleContent} body={bodyContent} />
  );
};

export default BannerModal;