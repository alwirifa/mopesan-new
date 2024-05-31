import React, { useCallback, useState } from 'react';
import Modal from '../Modal';
import { useEditMenuModal } from '@/app/hooks/menu/useEditMenuModal';

import Image from 'next/image';
import { Menu } from '@/app/types/types';
import { formatCurrency } from '@/app/lib/formatter';

enum STEPS {
    NAME = 0,
    PRICE = 1,
    VARIANT = 2,
    DONE = 3
  }
  
  interface Option {
    value: string;
    price: string;
  }
  
  interface Variant {
    name: string;
    options: Option[];
  }

const EditMenuModal = ({ selectedMenu }: { selectedMenu: Menu | null }) => {
    const editMenuModal = useEditMenuModal();

    // let bodyContent = selectedMenu ? (
    //     <div>
    //         <h2>Edit menu {selectedMenu.product_name}</h2>
    //         <p>Price: {selectedMenu.price}</p>
    //         <p>Description: {selectedMenu.description}</p>
    //         {/* Add form elements to edit the menu details */}
    //     </div>
    // ) : (
    //     <div>No menu selected</div>
    // );

    const [step, setStep] = useState(STEPS.NAME);

    // Function to handle advancing to the next step
    const onNext = useCallback(() => {
      setStep((prevStep) => Math.min(prevStep + 1, STEPS.DONE));
    }, []);
  
    // Function to handle going back to the previous step
    const onBack = useCallback(() => {
      setStep((prevStep) => Math.max(prevStep - 1, STEPS.NAME));
    }, []);
  
    // Function to handle form submission and modal close
    const onSubmitAndClose = useCallback(() => {
      console.log('Form submitted!');
      setStep(STEPS.NAME); // Reset step to NAME
      editMenuModal.onClose(); // Close the modal
    }, [editMenuModal]);
  
    const [customizationCheck, setCustomizationCheck] = useState<boolean>(false);
    const [variants, setVariants] = useState<Variant[]>([]);
  
    const addVariant = () => {
      setVariants([...variants, { name: '', options: [{ value: '', price: '' }] }]);
    };
  
    const deleteVariant = (index: number) => {
      const newVariants = variants.slice();
      newVariants.splice(index, 1);
      setVariants(newVariants);
    };
  
    const addVariantOption = (variantIndex: number) => {
      const newVariants = variants.slice();
      newVariants[variantIndex].options.push({ value: '', price: '' });
      setVariants(newVariants);
    };
  
    const deleteVariantOption = (variantIndex: number, optionIndex: number) => {
      const newVariants = variants.slice();
      newVariants[variantIndex].options.splice(optionIndex, 1);
      setVariants(newVariants);
    };
  
    const handleVariantChange = (index: number, value: string) => {
      const newVariants = variants.slice();
      newVariants[index].name = value;
      setVariants(newVariants);
    };
  
    const handleOptionChange = (variantIndex: number, optionIndex: number, field: keyof Option, value: string) => {
      const newVariants = variants.slice();
      newVariants[variantIndex].options[optionIndex][field] = value;
      setVariants(newVariants);
    };
  
  
  
    let bodyContent = (
      <div className="flex flex-col gap-4">
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
          <label htmlFor="product_name" className="block font-medium leading-6 text-gray-900">
            Nama Produk<span className='text-primary'>*</span>
          </label>
          <input
            type="text"
            id="product_name"
            // value={productName}
            // onChange={(e) => setProductName(e.target.value)}
            placeholder={selectedMenu?.product_name}
            className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic placeholder:font-light"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="block font-medium leading-6 text-gray-900">
            Description
          </label>
          <textarea
            rows={3}
            name="description"
            placeholder={selectedMenu?.description}
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1>Foto Produk</h1>
          <div className="w-24 h-24 border-neutral-300 rounded cursor-pointer">
            <label htmlFor="image" className="cursor-pointer">
              <Image src='/icons/menu/uploadPhoto.svg' alt="Upload Photo" className='-translate-x-1' width={96} height={96} />
              <input type="file" id="image" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* <MenuPicker label="Kategori Produk" onMerchantSelect={handleMerchantSelect} /> */}
          <p className='translate-x-1 text-[10px] text-textGray'>Kategori belum tersedia? <span className='text-primary'>Tambah Kategori</span></p>
        </div>
        <div className='flex justify-end items-center gap-4'>
          <button onClick={onNext} className='border border-primary px-4 py-2  rounded-md bg-primary text-white'>Next</button>
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
            <label htmlFor="price" className="block font-medium leading-6 text-gray-900">
              Harga Produk<span className='text-primary'>*</span>
            </label>
            <input
              type="number"
              id="price"
              placeholder={String(formatCurrency(selectedMenu?.price ?? 0))}
              // value={price}
              // onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="block font-medium leading-6 text-gray-900">
              Volume (dalam PxLxT)
            </label>
            <div className='flex gap-2'>
              <div className='px-6 py-2 border rounded-md shadow-md italic text-textGray'>1</div>
              <div className='px-6 py-2 border rounded-md shadow-md italic text-textGray'>1</div>
              <div className='px-6 py-2 border rounded-md shadow-md italic text-textGray'>1</div>
            </div>
          </div>
          <div className='flex justify-end items-center gap-4'>
            <button onClick={onBack} className='border border-primary px-4 py-2  rounded-md text-primary '>Previous</button>
            <button onClick={onNext} className='border border-primary px-4 py-2  rounded-md bg-primary text-white'>Next</button>
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
          <div className='flex justify-between'>
            <div className='flex justify-start items-center gap-2'>
              <input
                type="checkbox"
                className="input"
                checked={customizationCheck}
                onChange={(e) => setCustomizationCheck(e.target.checked)}
              />
              <p>This item has customizations</p>
            </div>
            <div className={customizationCheck ? "px-4 py-2 rounded-md border border-primary text-primary shadow-md" : "hidden"}>
              <button onClick={addVariant}>+ Add another Variant</button>
            </div>
  
          </div>
  
          {customizationCheck && variants.map((variant, variantIndex) => (
            <div key={variantIndex} className='flex flex-col gap-8'>
              <div className="flex flex-col gap-2">
                <div className='flex justify-between'>
                  <label htmlFor={`variant_name_${variantIndex}`} className="block font-medium leading-6 text-gray-900">
                    Variant Name<span className='text-primary'>*</span>
                  </label>
                  <button onClick={() => deleteVariant(variantIndex)} className="text-red-500">Delete Variant</button>
                </div>
                <input
                  type="text"
                  id={`variant_name_${variantIndex}`}
                  placeholder='Example: Size, Additional, Color, etc.'
                  value={variant.name}
                  onChange={(e) => handleVariantChange(variantIndex, e.target.value)}
                  className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic placeholder:font-light"
                />
  
              </div>
              <div className="flex flex-col gap-1">
                <div className='flex justify-between items-center'>
  
                  <label htmlFor={`variant_option_${variantIndex}`} className="block font-medium leading-6 text-gray-900">
                    Variant Option<span className='text-primary'>*</span>
                  </label>
                  <button onClick={() => addVariantOption(variantIndex)} className="px-4 py-2 rounded-md border border-primary text-primary shadow-md">+ Add another Option</button>
                </div>
                {variant.options.map((option, optionIndex) => (
                  <div key={optionIndex} className='flex gap-2 w-full'>
                    <div className="flex flex-col gap-2 w-1/2">
                      <label htmlFor={`option_value_${variantIndex}_${optionIndex}`} className="block font-medium leading-6 text-gray-900">
                        Varian<span className='text-primary'>*</span>
                      </label>
                      <input
                        type="text"
                        id={`option_value_${variantIndex}_${optionIndex}`}
                        placeholder='Ex. Big, Egg, Red'
                        value={option.value}
                        onChange={(e) => handleOptionChange(variantIndex, optionIndex, 'value', e.target.value)}
                        className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic placeholder:font-light"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2 relative">
                      <label htmlFor={`price_${variantIndex}_${optionIndex}`} className="block font-medium leading-6 text-gray-900">
                        Price<span className='text-primary'>*</span>
                      </label>
                      <input
                        type="number"
                        id={`price_${variantIndex}_${optionIndex}`}
                        placeholder='Contoh: 19.000.00'
                        value={option.price}
                        onChange={(e) => handleOptionChange(variantIndex, optionIndex, 'price', e.target.value)}
                        className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
                      />
                      <div className="absolute top-0 right-0">
                        <button onClick={() => deleteVariantOption(variantIndex, optionIndex)} className="text-red-500">Delete Option</button>
                      </div>
                    </div>
  
  
                  </div>
                ))}
  
              </div>
            </div>
          ))}
          <div className='flex justify-end items-center gap-4'>
            <button onClick={onBack} className='border border-primary px-4 py-2  rounded-md text-primary '>Previous</button>
            <button onClick={onNext} className='border border-primary px-4 py-2  rounded-md bg-primary text-white'>Done</button>
          </div>
  
        </div>
      )
    }
  
    if (step === STEPS.DONE) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <div className='border-t border-b border-primary py-4'>
            Menu Successfully Added. If nothing happened, try refresh the <span className='text-primary'>page</span>.
          </div>
          <div className='flex justify-end items-center gap-4'>
            <button onClick={onSubmitAndClose} className='border border-primary px-4 py-2  rounded-md bg-primary text-white'>Close</button>
          </div>
        </div>
      )
    }
  
  
    const titleContent = (
      <div>
        <h1 className="text-4xl font-semibold">Add new Menu</h1>
      </div>
    )

    return (
        <Modal
            isOpen={editMenuModal.isOpen}
            onClose={editMenuModal.onClose}
            body={bodyContent}
        />
    );
};

export default EditMenuModal;
