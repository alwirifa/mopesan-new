"use client"

import React, { useState } from 'react';

interface Option {
    value: string;
    price: string;
}

interface Variant {
    name: string;
    options: Option[];
}

const Variant = () => {
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


    return (
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
        </div>
    );
};

export default Variant;
