import React, { useState } from "react";
import { useEditAdminModal } from "@/app/hooks/admin/useEditAdminModal";
import { editMenus } from "@/app/api/menu";

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
  menuId: string;
  data: {
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

const EditForm = ({ menuId, data }: Props) => {
  const editMenuModal = useEditAdminModal();
  const [productName, setProductName] = useState<string>(data.product_name);
  const [price, setPrice] = useState<string>(data.price);
  const [description, setDescription] = useState<string>(data.description);
  const [rewardMenu, setRewardMenu] = useState<boolean>(data.is_reward_menu);
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string>(data.category_id);

  // Menggunakan filter untuk menghapus customization_keys yang memiliki customization_values === null
  const customizationKeys = data.customization_keys.filter(
    (key) => key.customization_values !== null
  );

  const [editCustomization, setEditCustomization] = useState<Customization>(
    customizationKeys.length > 0
      ? {
          variants: customizationKeys.map((variant) => ({
            variant_id: variant.id,
            variant_name: variant.name,
            variant_options: variant.customization_values!.map((option) => ({
              variant_option_id: option.id,
              variant_option_name: option.name,
              price_adjustment: option.price_adjustment,
            })),
          })),
        }
      : { variants: [] }
  );

  const [addCustomization, setAddCustomization] = useState<Customization>({
    variants: [],
  });

  const [deleteCustomization, setDeleteCustomization] = useState<{
    delete_variant: string[];
    delete_variant_opt: string[];
  }>({ delete_variant: [], delete_variant_opt: [] });

  const handleEditCustomizationChange = (
    variantIndex: number,
    optionIndex: number,
    key: keyof VariantOption | "variant_name",
    value: string
  ) => {
    const newEditCustomization = { ...editCustomization };
    if (key === "variant_name") {
      newEditCustomization.variants[variantIndex].variant_name = value;
    } else {
      newEditCustomization.variants[variantIndex].variant_options[optionIndex][
        key
      ] = value;
    }
    setEditCustomization(newEditCustomization);
  };

  const handleAddCustomization = () => {
    const newAddCustomization: Customization = {
      variants: [
        ...addCustomization.variants,
        {
          variant_name: "",
          variant_options: [{ variant_option_name: "", price_adjustment: "" }],
        },
      ],
    };
    setAddCustomization(newAddCustomization);
  };

  const handleAddOption = (variantIndex: number) => {
    const newAddCustomization = { ...addCustomization };
    newAddCustomization.variants[variantIndex].variant_options.push({
      variant_option_name: "",
      price_adjustment: "",
    });
    setAddCustomization(newAddCustomization);
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
      price: price,
      description: description,
      is_reward_menu: rewardMenu,
      image: image,
      category_id: categoryId,
      edit_customization:
        editCustomization.variants.length > 0 ? editCustomization : undefined,
      add_customization:
        addCustomization.variants.length > 0 ? addCustomization : undefined,
      delete_customization: deleteCustomization.delete_variant.length > 0
        ? deleteCustomization
        : undefined,
    };

    try {
      await editMenus(menuData, menuId);
      editMenuModal.onClose();
    } catch (error) {
      console.error("Failed to edit menu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Reward Menu:</label>
        <input
          type="checkbox"
          checked={rewardMenu}
          onChange={(e) => setRewardMenu(e.target.checked)}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
      </div>

      {editCustomization.variants.length > 0 &&
        editCustomization.variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            <h3>List customization</h3>
            <div className="flex justify-between my-8">
              <div className="flex flex-col">
                <label>{variant.variant_name}</label>
                {variant.variant_options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label>{option.variant_option_name}</label>
                    <label>{option.price_adjustment}</label>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteCustomization(variant.variant_id!)}
                >
                  Delete
                </button>
                <button type="button">Edit</button>
              </div>
            </div>
          </div>
        ))}

      {editCustomization.variants.length > 0 &&
        editCustomization.variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            <h3>Customization</h3>
            <label>Variant Name</label>
            <input
              type="text"
              value={variant.variant_name}
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
              <div key={optionIndex}>
                <label>Variant Option Name</label>
                <input
                  type="text"
                  value={option.variant_option_name}
                  onChange={(e) =>
                    handleEditCustomizationChange(
                      variantIndex,
                      optionIndex,
                      "variant_option_name",
                      e.target.value
                    )
                  }
                />
                <label>Price Adjustment</label>
                <input
                  type="text"
                  value={option.price_adjustment}
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
            ))}
          </div>
        ))}

      {addCustomization.variants.map((variant, variantIndex) => (
        <div key={variantIndex}>
          <h3>Add Customization</h3>
          <label>Variant Name</label>
          <input
            type="text"
            value={variant.variant_name}
            onChange={(e) =>
              setAddCustomization((prevState) => ({
                ...prevState,
                variants: prevState.variants.map((item, idx) =>
                  idx === variantIndex
                    ? { ...item, variant_name: e.target.value }
                    : item
                ),
              }))
            }
          />
          {variant.variant_options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>Variant Option Name</label>
              <input
                type="text"
                value={option.variant_option_name}
                onChange={(e) =>
                  setAddCustomization((prevState) => ({
                    ...prevState,
                    variants: prevState.variants.map((item, idx) =>
                      idx === variantIndex
                        ? {
                            ...item,
                            variant_options: item.variant_options.map(
                              (opt, oIdx) =>
                                oIdx === optionIndex
                                  ? {
                                      ...opt,
                                      variant_option_name: e.target.value,
                                    }
                                  : opt
                            ),
                          }
                        : item
                    ),
                  }))
                }
              />
              <label>Price Adjustment</label>
              <input
                type="text"
                value={option.price_adjustment}
                onChange={(e) =>
                  setAddCustomization((prevState) => ({
                    ...prevState,
                    variants: prevState.variants.map((item, idx) =>
                      idx === variantIndex
                        ? {
                            ...item,
                            variant_options: item.variant_options.map(
                              (opt, oIdx) =>
                                oIdx === optionIndex
                                  ? {
                                      ...opt,
                                      price_adjustment: e.target.value,
                                    }
                                  : opt
                            ),
                          }
                        : item
                    ),
                  }))
                }
              />
            </div>
          ))}
          <button type="button" onClick={() => handleAddOption(variantIndex)}>
            Add Option
          </button>
        </div>
      ))}

      <button
        type="button"
        className="my-4"
        onClick={handleAddCustomization}
      >
        Add Customization
      </button>

      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;
