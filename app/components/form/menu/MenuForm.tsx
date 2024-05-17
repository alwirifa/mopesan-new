"use client"

import React, { useCallback, useMemo, useState } from 'react';
import { createMenu } from '@/app/lib/actions/menuActions';

enum STEPS {
  NAME = 0,
  PRICE = 1,
  VARIANT = 2
}


const MenuForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [step, setStep] = useState(STEPS.NAME);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {

  }, []);


  const actionLabel = useMemo(() => {
    if (step === STEPS.VARIANT) {
      return ''
    }

    return 'Done'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined
    }

    return 'Back'
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-8">

    </div>
  )

  if (step === STEPS.NAME) {
    <div>
      <h1>Nama Produk<span className='text-primary'>*</span></h1>
      <h1>Deskripsi Produk</h1>
      <h1>Foto Produk</h1>
      <img src='/icons/menu/uploadPhoto.svg' alt="" className='w-24 h-24 -translate-x-1' />
      <h1>Kategori Produk</h1>
    </div>
  }


  if (step === STEPS.PRICE) {
    bodyContent = (

      <div>

      </div>
    )
  }

  if (step === STEPS.VARIANT) {
    <div>

    </div>
  }


  return (
    <div className="rounded-lg bg-white">

    


    </div>
  );
};

export default MenuForm;
