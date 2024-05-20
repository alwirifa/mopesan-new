"use client"

import React from 'react';
import Modal from '../Modal';
import BannerForm from '../../form/banner/BannerForm';
import { useBannerModal } from '@/app/hooks/banner/useBannerModal';


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
    <Modal isOpen={bannerModal.isOpen} onClose={bannerModal.onClose} title={titleContent} body={bodyContent} onSubmit={function (): void {
      throw new Error('Function not implemented.');
    } } />
  );
};

export default BannerModal;
