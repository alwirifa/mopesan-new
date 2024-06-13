import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { editMenus } from "@/app/api/menu";
import { useEditMenuModal } from "@/app/hooks/menu/useEditMenuModal";
import { formatCurrency } from "@/app/lib/formatter";

enum STEPS {
  NAME = 0,
  PRICE = 1,
  VARIANT = 2,
}

type CustomizationValue = {
  id: string;
  name: string;
  price_adjustment: string;
};

type CustomizationKey = {
  id: string;
  name: string;
  customization_values: CustomizationValue[] | null;
};

type Props = {
  selectedMenu: {
    id: string;
    product_name: string;
    price: string;
    description: string;
    is_reward_menu: boolean;
    category_id: string;
    customization_keys: CustomizationKey[];
  };
};

type VariantOption = {
  variant_option_id?: string;
  variant_option_name: string;
  price_adjustment: string;
};

type Variant = {
  variant_id?: string;
  variant_name: string;
  variant_options: VariantOption[];
};

type Customization = {
  variants: Variant[];
};

const EditMenuModal = ({ selectedMenu }: Props) => {
  const editMenuModal = useEditMenuModal(); // Ensure correct hook usage
  const [step, setStep] = useState<STEPS>(STEPS.NAME); // Initialize step state

  const {
    product_name,
    price,
    description,
    is_reward_menu,
    category_id,
    customization_keys,
  } = selectedMenu;

  const [productName, setProductName] = useState<string>(product_name);
  const [menuPrice, setMenuPrice] = useState<string>(price);
  const [menuDescription, setMenuDescription] = useState<string>(description);
  const [rewardMenu, setRewardMenu] = useState<boolean>(is_reward_menu);
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string>(category_id);

  const customizationKeys = useMemo(
    () => customization_keys.filter((key) => key.customization_values !== null),
    [customization_keys]
  );

  const [editCustomization, setEditCustomization] = useState<Customization>({
    variants: customizationKeys.map((variant) => ({
      variant_id: variant.id,
      variant_name: variant.name,
      variant_options: variant.customization_values!.map((option) => ({
        variant_option_id: option.id,
        variant_option_name: option.name,
        price_adjustment: String(option.price_adjustment),
      })),
    })),
  });

  const [addCustomization, setAddCustomization] = useState<Customization>({
    variants: [],
  });

  const [deleteCustomization, setDeleteCustomization] = useState<{
    delete_variant: string[];
    delete_variant_opt: string[];
  }>({ delete_variant: [], delete_variant_opt: [] });

  const [editModeVariantIndex, setEditModeVariantIndex] = useState<
    number | null
  >(null);

  // const handleEditCustomizationChange = (
  //   variantIndex: number,
  //   optionIndex: number,
  //   key: keyof VariantOption | "variant_name",
  //   value: string
  // ) => {
  //   setEditCustomization((prevState) => {
  //     const newVariants = [...prevState.variants];
  //     if (key === "variant_name") {
  //       newVariants[variantIndex].variant_name = value;
  //     } else {
  //       newVariants[variantIndex].variant_options[optionIndex][key] = value;
  //     }
  //     return { ...prevState, variants: newVariants };
  //   });
  // };

  const handleEditCustomizationChange = (
    variantIndex: number,
    optionIndex: number,
    key: keyof VariantOption | "variant_name",
    value: string
  ) => {
    setEditCustomization((prevState) => {
      const newVariants = [...prevState.variants];
      if (key === "variant_name") {
        newVariants[variantIndex].variant_name = value;
      } else {
        newVariants[variantIndex].variant_options[optionIndex][key] = value;
      }
      return { ...prevState, variants: newVariants };
    });
  };

  const handleAddOption = (variantIndex: number) => {
    const updatedVariants = [...addCustomization.variants];
    updatedVariants[variantIndex].variant_options.push({
      variant_option_name: "",
      price_adjustment: "",
    });
    setAddCustomization({ ...addCustomization, variants: updatedVariants });
  };

  const handleAddEditOption = (variantIndex: number) => {
    const updatedVariants = [...editCustomization.variants];
    updatedVariants[variantIndex].variant_options.push({
      variant_option_name: "",
      price_adjustment: "",
    });
    setEditCustomization({ ...editCustomization, variants: updatedVariants });
  };

  const handleDeleteCustomization = (variantId: string) => {
    setDeleteCustomization((prevState) => ({
      ...prevState,
      delete_variant: [...prevState.delete_variant, variantId],
    }));

    setEditCustomization((prevState) => ({
      variants: prevState.variants.filter(
        (variant) => variant.variant_id !== variantId
      ),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const menuData = {
      product_name: productName,
      price: menuPrice,
      description: menuDescription,
      is_reward_menu: rewardMenu,
      image: image,
      category_id: categoryId,
      edit_customization:
        editCustomization.variants.length > 0 ? editCustomization : undefined,
      add_customization:
        addCustomization.variants.length > 0 ? addCustomization : undefined,
      delete_customization:
        deleteCustomization.delete_variant.length > 0
          ? deleteCustomization
          : undefined,
    };

    try {
      await editMenus(menuData, selectedMenu.id);
      toast.promise(editMenus(menuData, selectedMenu.id), {
        loading: "Editing menu...",
        success: "Menu edited successfully",
        error: "Failed to edit menu",
      });

      editMenuModal.onClose();
    } catch (error) {
      toast.promise(editMenus(menuData, selectedMenu.id), {
        loading: "Editing menu...",
        success: "Menu edited successfully",
        error: "Failed to edit menu",
      });
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
  };

  const onBack = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const titleContent = useMemo(
    () => (
      <div>
        <h1 className="text-3xl font-semibold">
          Edit {selectedMenu.product_name}
        </h1>
      </div>
    ),
    [selectedMenu.product_name]
  );

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
          placeholder={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required
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
          name="description"
          onChange={(e) => setMenuDescription(e.target.value)}
          placeholder={menuDescription}
          className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1>Foto Produk</h1>
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
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
        </div>
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
            Harga Produk<span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="price"
            placeholder={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
            className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <label>
            Is Reward Menu:
            <input
              type="checkbox"
              name="is_reward_menu"
              checked={rewardMenu}
              onChange={(e) => setRewardMenu(e.target.checked)}
            />
          </label>
        </div>
      </div>
    );
  }

  const handleDeleteVariant = (variantIndex: number) => {
    const updatedVariants = [...addCustomization.variants];
    updatedVariants.splice(variantIndex, 1);
    setAddCustomization({ ...addCustomization, variants: updatedVariants });
  };

  const handleVariantChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    const updatedVariants = [...addCustomization.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [fieldName]: value,
    };
    setAddCustomization({ ...addCustomization, variants: updatedVariants });
  };

  const handleOptionChange = (
    variantIndex: number,
    optionIndex: number,
    fieldName: string,
    value: string
  ) => {
    const updatedVariants = [...addCustomization.variants];
    updatedVariants[variantIndex].variant_options[optionIndex] = {
      ...updatedVariants[variantIndex].variant_options[optionIndex],
      [fieldName]: value,
    };
    setAddCustomization({ ...addCustomization, variants: updatedVariants });
  };

  const handleAddCustomization = () => {
    setAddCustomization((prevState) => ({
      ...prevState,
      variants: [
        ...prevState.variants,
        {
          variant_name: "",
          variant_options: [{ variant_option_name: "", price_adjustment: "" }],
        },
      ],
    }));
  };

  // const handleAddVariant = () => {
  //   setAddCustomization({
  //     ...addCustomization,
  //     variants: [
  //       ...addCustomization.variants,
  //       {
  //         variant_name: "",
  //         variant_options: [{ variant_option_name: "", price_adjustment: "" }],
  //       },
  //     ],
  //   });
  // };

  // const handleAddVariant = () => {
  //   setProductInfo({
  //     ...productInfo,
  //     variants: [
  //       ...productInfo.variants,
  //       {
  //         variant_name: "",
  //         variant_options: [{ variant_option_name: "", price_adjustment: "" }],
  //       },
  //     ],
  //   });
  // };

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
        {editCustomization.variants.length > 0 &&
          editCustomization.variants.map((variant, variantIndex) => (
            <div key={variantIndex}>
              {editModeVariantIndex === variantIndex ? (
                <>
                  <h3>Edit Customization</h3>

                  <label>Variant Name</label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    placeholder={variant.variant_name}
                    onChange={(e) =>
                      handleEditCustomizationChange(
                        variantIndex,
                        0,
                        "variant_name",
                        e.target.value
                      )
                    }
                  />
                  {variant.variant_options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-4">
                      <div className="w-full">
                        <label>Variant Option Name</label>
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                          placeholder={option.variant_option_name}
                          onChange={(e) =>
                            handleEditCustomizationChange(
                              variantIndex,
                              optionIndex,
                              "variant_option_name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="w-full">
                        <label>Price Adjustment</label>
                        <input
                          type="number"
                          className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                          placeholder={String(option.price_adjustment)}
                          value={String(option.price_adjustment)}
                          onChange={(e) =>
                            handleEditCustomizationChange(
                              variantIndex,
                              optionIndex,
                              "price_adjustment",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4 items-center">
                    <button
                      type="button"
                      onClick={() => handleAddEditOption(variantIndex)}
                      className="border px-4 py-2 text-primary border-primary rounded-md text-sm italic transition hover:bg-primary hover:text-white"
                    >
                      Add Option
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModeVariantIndex(null)}
                      className="border px-4 py-2 text-primary border-primary rounded-md text-sm italic transition hover:bg-primary hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModeVariantIndex(null)}
                      className="border px-4 py-2 text-primary border-primary rounded-md text-sm italic transition hover:bg-primary hover:text-white"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center my-4 p-4 bg-white shadow rounded-md">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <label className="font-semibold text-lg">
                          Variant {variantIndex + 1}
                        </label>
                      </div>
                      <h1 className="pl-4 text-lg text-gray-700">
                        {variant.variant_name}
                      </h1>
                      {variant.variant_options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex flex-col ml-4 mt-2"
                        >
                          <label className="text-sm text-gray-600">
                            Variant Option {optionIndex + 1}:{" "}
                            {option.variant_option_name}
                          </label>
                          <label className="text-sm text-gray-600">
                            Price:{" "}
                            {formatCurrency(Number(option.price_adjustment))}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCustomization(variant.variant_id!)
                        }
                        className="border px-4 py-2 text-red-500 border-red-500 rounded-md text-sm italic transition hover:bg-red-500 hover:text-white"
                      >
                        Delete Variant
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditModeVariantIndex(variantIndex)}
                        className="border px-4 py-2 text-primary border-primary rounded-md text-sm italic transition hover:bg-primary hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddCustomization}
            className="border px-4 py-2 text-primary border-primary rounded-md text-sm italic transition hover:bg-primary hover:text-white"
          >
            Add Another Variant
          </button>
        </div>
        <div>
          <div className="absolute top-0"></div>
          {addCustomization.variants.map((variant, variantIndex) => (
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
                      className="border px-4 py-2 text-red-500 border-red-500 rounded-md text-sm italic transition hover:bg-red-500 hover:text-white"
                    >
                      Delete Variant
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddOption(variantIndex)}
                      className="border px-4 py-2 text-primary border-primary rounded-md text-sm italic transition hover:bg-primary hover:text-white"
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
                    "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 placeholder:italic"
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
                            "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400  placeholder:italic"
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
                            "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400  placeholder:italic"
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
    // Adjust based on actual modal library or implementation
    if (editMenuModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editMenuModal.isOpen]);

  if (!editMenuModal.isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={editMenuModal.isOpen}
      onClose={editMenuModal.onClose}
      title={titleContent}
      body={<form onSubmit={handleSubmit}>{bodyContent}</form>}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      onSubmit={wrappedHandleSubmit}
    />
  );
};

export default EditMenuModal;
