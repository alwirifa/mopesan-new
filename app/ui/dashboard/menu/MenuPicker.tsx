"use client"

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Category, Merchant } from '@/app/lib/types/index';
import clsx from 'clsx';
import { getCategories } from '@/app/lib/actions/menuActions';


interface MerchantPickerProps {
    onMerchantSelect: (merchantId: string | null) => void;
    label: string// Define prop for handling merchant selection
}

const MenuPicker: React.FC<MerchantPickerProps> = ({ onMerchantSelect, label }) => {
    const [merchants, setMerchants] = useState<Category[]>([]);
    const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const merchantsData = await getCategories();
                setMerchants(merchantsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => { };
    }, []);

    const handleMerchantSelect = (selectedOption: any) => {
        const merchantId = selectedOption ? selectedOption.value : null;
        setSelectedMerchantId(merchantId);
        onMerchantSelect(merchantId); // Call the prop function with the selected merchant ID
    };

    // { value: '0', label: 'Semua M' },
    const merchantOptions = [ // Option for "Semua Merchant"
        ...merchants.map(merchant => ({
            value: merchant.id,
            label: merchant.category_name
        }))
    ];

    const controlStyles = {
        base: "border rounded-lg bg-white hover:cursor-pointer",
        focus: "border-primary ring-1 ring-primary",
        nonFocus: "border-gray-300 hover:border-gray-400",
    };
    const placeholderStyles = "text-gray-500 pl-1 py-0.5";
    const selectInputStyles = "pl-1 py-0.5";
    const valueContainerStyles = "p-1 gap-1";
    const singleValueStyles = "leading-7 ml-1";
    const multiValueStyles =
        "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
    const multiValueLabelStyles = "leading-6 py-0.5";
    const multiValueRemoveStyles =
        "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
    const indicatorsContainerStyles = "p-1 gap-1";
    const clearIndicatorStyles =
        "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
    const indicatorSeparatorStyles = "bg-gray-300";
    const dropdownIndicatorStyles =
        "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
    const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
    const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
    const optionStyles = {
        base: "hover:cursor-pointer px-3 py-2 rounded",
        focus: "bg-gray-100 active:bg-gray-200",
        selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
    };
    const noOptionsMessageStyles =
        "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";


    return (
        <div className="mx-auto w-full">
            <label className="block font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="w-full pt-2 trsa">

                <Select
                    options={merchantOptions}
                    isClearable={true}
                    instanceId="my-unique-id"
                    getOptionValue={(merchant) => merchant.value.toString()} // Set input ID to merchant ID
                    onChange={handleMerchantSelect}
                    unstyled
                    classNames={{
                        control: ({ isFocused }) =>
                            clsx(
                                isFocused ? controlStyles.focus : controlStyles.nonFocus,
                                controlStyles.base,
                            ),
                        placeholder: () => placeholderStyles,
                        input: () => selectInputStyles,
                        valueContainer: () => valueContainerStyles,
                        singleValue: () => singleValueStyles,
                        multiValue: () => multiValueStyles,
                        multiValueLabel: () => multiValueLabelStyles,
                        multiValueRemove: () => multiValueRemoveStyles,
                        indicatorsContainer: () => indicatorsContainerStyles,
                        clearIndicator: () => clearIndicatorStyles,
                        indicatorSeparator: () => indicatorSeparatorStyles,
                        dropdownIndicator: () => dropdownIndicatorStyles,
                        menu: () => menuStyles,
                        groupHeading: () => groupHeadingStyles,
                        option: ({ isFocused, isSelected }) =>
                            clsx(
                                isFocused && optionStyles.focus,
                                isSelected && optionStyles.selected,
                                optionStyles.base,
                            ),
                        noOptionsMessage: () => noOptionsMessageStyles,
                    }}
                />

            </div>

        </div>
    );
}

export default MenuPicker;
