"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMenuModal } from "@/app/hooks/menu/useMenuModal";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { getCategories } from "@/app/api/menu";
import { Category } from "@/app/types/types";
import Image from "next/image";

enum STEPS {
  NAME = 0,
  PRICE = 1,
  VARIANT = 2,
}

interface VariantOption {
  variant_option_name: string;
  price_adjustment: string;
}

interface Variant {
  variant_name: string;
  variant_options: VariantOption[];
}

interface ProductInfo {
  product_name: string;
  price: string;
  description: string;
  is_reward_menu: boolean;
  image: File | null;
  category_id: string;
  variants: Variant[];
}

const MenuModal = () => {
  const menuModal = useMenuModal();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [step, setStep] = useState(STEPS.NAME);
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    product_name: "",
    price: "",
    description: "",
    is_reward_menu: false,
    image: null,
    category_id: "",
    variants: [
      {
        variant_name: "",
        variant_options: [{ variant_option_name: "", price_adjustment: "" }],
      },
    ],
  });

  // ======================   STEP   ======================
  const onNext = useCallback(() => {
    setStep((prevStep) => Math.min(prevStep + 1, STEPS.VARIANT));
  }, []);

  const onBack = useCallback(() => {
    setStep((prevStep) => Math.max(prevStep - 1, STEPS.NAME));
  }, []);

  // ======================  CATEGORY  ======================
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
  
    if (name === "category_id") {
      setProductInfo({ ...productInfo, [name]: value });
    } else if (event.target instanceof HTMLInputElement && type === "checkbox") {
      setProductInfo({ ...productInfo, [name]: event.target.checked });
    } else {
      setProductInfo({ ...productInfo, [name]: value });
    }
  };
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProductInfo({ ...productInfo, image: event.target.files[0] });
    }
  };

  // ======================   VARIANT ======================
  const [hasCustomization, setHasCustomization] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasCustomization(event.target.checked);
  };

  const handleVariantChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    const updatedVariants = [...productInfo.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [fieldName]: value,
    };
    setProductInfo({ ...productInfo, variants: updatedVariants });
  };

  const handleOptionChange = (
    variantIndex: number,
    optionIndex: number,
    fieldName: string,
    value: string
  ) => {
    const updatedVariants = [...productInfo.variants];
    updatedVariants[variantIndex].variant_options[optionIndex] = {
      ...updatedVariants[variantIndex].variant_options[optionIndex],
      [fieldName]: value,
    };
    setProductInfo({ ...productInfo, variants: updatedVariants });
  };

  const handleAddVariant = () => {
    setProductInfo({
      ...productInfo,
      variants: [
        ...productInfo.variants,
        {
          variant_name: "",
          variant_options: [{ variant_option_name: "", price_adjustment: "" }],
        },
      ],
    });
  };

  const handleAddOption = (variantIndex: number) => {
    const updatedVariants = [...productInfo.variants];
    updatedVariants[variantIndex].variant_options.push({
      variant_option_name: "",
      price_adjustment: "",
    });
    setProductInfo({ ...productInfo, variants: updatedVariants });
  };

  const handleDeleteVariant = (variantIndex: number) => {
    const updatedVariants = [...productInfo.variants];
    updatedVariants.splice(variantIndex, 1);
    setProductInfo({ ...productInfo, variants: updatedVariants });
  };

  // ======================   SUBMIT  ======================
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (productInfo.image) {
        formData.append("image", productInfo.image);
      }
      formData.append(
        "menu",
        JSON.stringify({
          product_name: productInfo.product_name,
          price: parseFloat(productInfo.price),
          description: productInfo.description,
          is_reward_menu: productInfo.is_reward_menu,
        })
      );
      formData.append("category_id", productInfo.category_id);
      formData.append("variants", JSON.stringify(productInfo.variants));

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Admin token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/menu`,
        formData,
        config
      );
      toast.success("Menu added successfully!");
    } catch (error) {
      toast.error("Failed to add menu");
    }
  };

  const wrappedHandleSubmit = () => {
    if (step !== STEPS.VARIANT) {
      return onNext();
    }
    const form = document.querySelector("form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }

    setStep(STEPS.VARIANT);
    menuModal.onClose();
  };

  const titleContent = (
    <div>
      <h1 className="text-4xl font-semibold">Add new Menu</h1>
    </div>
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        console.log(categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-textGray text-xs">STEP 1 OF 3</p>
        <div className="flex flex-col gap-2">
          <p className="text-primary">Product Information</p>
          <div className="flex gap-4">
            <div className="h-2 w-full bg-primary rounded-full" />
            <div className="h-2 w-full bg-textGray rounded-full" />
            <div className="h-2 w-full bg-textGray rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="product_name"
          className="block font-medium leading-6 text-gray-900"
        >
          Nama Produk <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="product_name"
          placeholder="Contoh: Dosirak Dakgalbi"
          value={productInfo.product_name}
          onChange={handleInputChange}
          className={
            invalidFields.includes("product_name")
              ? "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400"
              : "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          }
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="block font-medium leading-6 text-gray-900"
        >
          Description <span className="text-primary">*</span>
        </label>
        <textarea
          name="description"
          value={productInfo.description}
          onChange={handleInputChange}
          placeholder="Contoh: Hidangan nikmat dengan ..."
          className={
            invalidFields.includes("description")
              ? "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400"
              : "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          }
          required
        />
      </div>

      {/* <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div> */}
      <div className="flex flex-col gap-2">
        <h1>Foto Produk <span className="text-primary">*</span></h1>
        <div className="w-24 h-24 border-neutral-300 rounded cursor-pointer">
          <label htmlFor="image" className="cursor-pointer">
            <Image
              src="/icons/menu/uploadPhoto.svg"
              alt="Upload Photo"
              className="-translate-x-1"
              width={96}
              height={96}
            />
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="block font-medium leading-6 text-gray-900"
        >
          Category <span className="text-primary">*</span>
        </label>
        <select
          name="category_id"
          value={productInfo.category_id}
          onChange={handleInputChange}
          className={
            invalidFields.includes("category_id")
              ? "block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400"
              : "block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          }
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-textGray text-xs">STEP 2 OF 3</p>
          <div className="flex flex-col gap-2">
            <p className="text-primary">Harga</p>
            <div className="flex gap-4">
              <div className="h-2 w-full bg-primary rounded-full" />
              <div className="h-2 w-full bg-primary rounded-full" />
              <div className="h-2 w-full bg-textGray rounded-full" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block font-medium leading-6 text-gray-900"
          >
            Harga Produk <span className="text-primary">*</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="Contoh: Rp:19.000.00"
            value={productInfo.price}
            onChange={handleInputChange}
            className={
              invalidFields.includes("price")
                ? "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400"
                : "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
            }
            required
          />
        </div>

        <div>
          <label>
            Is Reward Menu:
            <input
              type="checkbox"
              name="is_reward_menu"
              checked={productInfo.is_reward_menu}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>
    );
  }

  if (step === STEPS.VARIANT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-textGray text-xs">STEP 3 OF 3</p>
          <div className="flex flex-col gap-2">
            <p className="text-primary">Variant</p>
            <div className="flex gap-4">
              <div className="h-2 w-full bg-primary rounded-full" />
              <div className="h-2 w-full bg-primary rounded-full" />
              <div className="h-2 w-full bg-primary rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hasCustomization}
              onChange={handleCheckboxChange}
              id="customizationCheckbox"
            />
            <label
              htmlFor="customizationCheckbox"
              className="ml-2 font-semibold"
            >
              This item has customization
            </label>
          </div>
          {hasCustomization && (
            <button
              type="button"
              onClick={handleAddVariant}
              className="px-4 py-2 border rounded-md border-primary text-primary italic text-sm"
            >
              Add Another Variant
            </button>
          )}
        </div>
        {hasCustomization && (
          <div>
            <div className="absolute top-0"></div>
            {productInfo.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center">
                    <label
                      htmlFor="product_name"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Variant {variantIndex + 1}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteVariant(variantIndex)}
                        className="border px-4 py-2 text-red-500 border-red-500 rounded-md text-sm italic "
                      >
                        Delete Variant
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddOption(variantIndex)}
                        className="px-4 py-2 border rounded-md border-primary text-primary italic text-sm"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Variant Name"
                    value={variant.variant_name}
                    onChange={(e) =>
                      handleVariantChange(
                        variantIndex,
                        "variant_name",
                        e.target.value
                      )
                    }
                    className={
                      invalidFields.includes(`variant_name_${variantIndex}`)
                        ? "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 placeholder:italic"
                        : "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic"
                    }
                    required
                  />
                </div>
                <div className="mb-4 ml-4">
                  {variant.variant_options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="product_name"
                          className="block font-medium leading-6 text-gray-900"
                        >
                          Variant Option {optionIndex + 1}
                        </label>

                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Ex. Big, Egg, Red"
                            value={option.variant_option_name}
                            onChange={(e) =>
                              handleOptionChange(
                                variantIndex,
                                optionIndex,
                                "variant_option_name",
                                e.target.value
                              )
                            }
                            className={
                              invalidFields.includes(
                                `option_name_${variantIndex}_${optionIndex}`
                              )
                                ? "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400  placeholder:italic"
                                : "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic"
                            }
                            required
                          />
                          <input
                            type="text"
                            placeholder="Ex. In Rupiah (19.000)"
                            value={option.price_adjustment}
                            onChange={(e) =>
                              handleOptionChange(
                                variantIndex,
                                optionIndex,
                                "price_adjustment",
                                e.target.value
                              )
                            }
                            className={
                              invalidFields.includes(
                                `price_adjustment_${variantIndex}_${optionIndex}`
                              )
                                ? "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400  placeholder:italic"
                                : "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic"
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.VARIANT) {
      return "Submit";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }

    return "Back";
  }, [step]);

  useEffect(() => {
    if (menuModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuModal.isOpen]);

  if (!menuModal.isOpen) {
    return null;
  }

  return (
    <Modal
      title={titleContent}
      disabled={isLoading}
      isOpen={menuModal.isOpen}
      onClose={menuModal.onClose}
      body={<form onSubmit={handleSubmit}>{bodyContent}</form>}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      onSubmit={wrappedHandleSubmit}
    />
  );
};

export default MenuModal;
