"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useMenuModal } from '@/app/hooks/menu/useMenuModal';
import Modal from '../Modal';
import MenuPicker from '@/app/ui/dashboard/menu/MenuPicker';
import Image from 'next/image';

enum STEPS {
  NAME = 0,
  PRICE = 1,
  VARIANT = 2
}

const MenuModal = () => {
  const menuModal = useMenuModal();
  const [step, setStep] = useState(STEPS.NAME);

  const [merchantId, setMerchantId] = useState('');

  const handleMerchantSelect = (merchantId: string | null) => {
    setMerchantId(merchantId ?? '');
  };


  const titleContent = (
    <div>
      <h1 className="text-3xl font-semibold">Add new Menu</h1>
    </div>
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    console.log(step)
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.VARIANT) {
      return onNext();
    }

  }, []);

  const actionLabel = useMemo(() => {
    if (step === STEPS.VARIANT) {
      return 'Submit';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4 over">
      <div>
        <p className='text-textGray text-xs'>STEP 1 OF 3</p>
        <div className='flex flex-col gap-2'>
          <p className='text-primary'>Product Information</p>
          <div className='flex gap-4'>
            <div className='h-2 w-full bg-primary rounded-full' />
            <div className='h-2 w-full bg-textGray rounded-full' />
            <div className='h-2 w-full bg-textGray rounded-full' />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="product_name"
          className="block font-medium leading-6 text-gray-900"
        >
          Nama Produk<span className='text-primary'>*</span>
        </label>
        <input
          type="text"
          id="product_name"
          // value={productName}
          // onChange={(e) => setProductName(e.target.value)}
          placeholder='Contoh: Dosirak Dakgalbi'
          className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic placeholder:font-light"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="block font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <textarea
          rows={3}
          name="description"
          placeholder="Contoh: Hidangan nikmat dengan ..."
          // value={description}
          // onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-md border-0  px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1>Foto Produk</h1>
        <div className="w-24 h-24 border-neutral-300 rounded cursor-pointer">
          <label htmlFor="image" className="cursor-pointer">
            <Image src='/icons/menu/uploadPhoto.svg' alt="Upload Photo" className='-translate-x-1' width={96} height={96} />
            <input
              type="file"
              id="image"
              // onChange={handleFileChange}
              className="hidden" // Menggunakan class "hidden" untuk menyembunyikan input file
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <MenuPicker label="Kategori Produk" onMerchantSelect={handleMerchantSelect} />
        <p className='translate-x-1 text-[10px] text-textGray'>Kategori belum tersedia? <span className='text-primary'>Tambah Kategori</span></p>
      </div>
    </div>
  );

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div>
          <p className='text-textGray text-xs'>STEP 2 OF 3</p>
          <div className='flex flex-col gap-2'>
            <p className='text-primary'>Harga</p>
            <div className='flex gap-4'>
              <div className='h-2 w-full bg-primary rounded-full' />
              <div className='h-2 w-full bg-primary rounded-full' />
              <div className='h-2 w-full bg-textGray rounded-full' />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="price"
            className="block font-medium leading-6 text-gray-900"
          >
            Harga Produk<span className='text-primary'>*</span>
          </label>
          <input
            type="number"
            id="price"
            placeholder='Contoh: 19.000.00'
            // value={price}
            // onChange={(e) => setPrice(e.target.value)}
            className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="price"
            className="block font-medium leading-6 text-gray-900"
          >
            Volume (dalam PxLxT)
          </label>
          <div className='flex gap-2'>

          <div className='px-6 py-2 border rounded-md shadow-md italic text-textGray'>1</div>
          <div className='px-6 py-2 border rounded-md shadow-md italic text-textGray'>1</div>
          <div className='px-6 py-2 border rounded-md shadow-md italic text-textGray'>1</div>
          </div>
        </div>

      </div>
    );
  }

  if (step === STEPS.VARIANT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div>
          <p className='text-textGray text-xs'>STEP 3 OF 3</p>
          <div className='flex flex-col gap-2'>
            <p className='text-primary'>Variant</p>
            <div className='flex gap-4'>
              <div className='h-2 w-full bg-primary rounded-full' />
              <div className='h-2 w-full bg-primary rounded-full' />
              <div className='h-2 w-full bg-primary rounded-full' />
            </div>
          </div>
        </div>
        <h1>Varian Produk</h1>
        <input type="text" placeholder="Masukkan varian" className="input input-bordered w-full" />
      </div>
    );
  }

  return (
    <Modal
      isOpen={menuModal.isOpen}
      onClose={menuModal.onClose}
      title={titleContent}
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
    />
  );
};

export default MenuModal;
