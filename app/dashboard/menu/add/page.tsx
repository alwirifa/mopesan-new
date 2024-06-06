"use client"

import React, { useState } from 'react';
import axios from 'axios';

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

const MenuForm: React.FC = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    product_name: '',
    price: '',
    description: '',
    is_reward_menu: false,
    image: null,
    category_id: '',
    variants: [
      {
        variant_name: '',
        variant_options: [{ variant_option_name: '', price_adjustment: '' }],
      },
    ],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (event.target instanceof HTMLInputElement && type === 'checkbox') {
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
          variant_name: '',
          variant_options: [{ variant_option_name: '', price_adjustment: '' }],
        },
      ],
    });
  };

  const handleAddOption = (variantIndex: number) => {
    const updatedVariants = [...productInfo.variants];
    updatedVariants[variantIndex].variant_options.push({
      variant_option_name: '',
      price_adjustment: '',
    });
    setProductInfo({ ...productInfo, variants: updatedVariants });
  };

  const handleDeleteVariant = (variantIndex: number) => {
    const updatedVariants = [...productInfo.variants];
    updatedVariants.splice(variantIndex, 1);
    setProductInfo({ ...productInfo, variants: updatedVariants });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (productInfo.image) {
        formData.append('image', productInfo.image);
      }
      formData.append(
        'menu',
        JSON.stringify({
          product_name: productInfo.product_name,
          price: parseFloat(productInfo.price),
          description: productInfo.description,
          is_reward_menu: productInfo.is_reward_menu,
        })
      );
      formData.append('category_id', productInfo.category_id);
      formData.append('variants', JSON.stringify(productInfo.variants));

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Admin token not found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/menu`,
        formData,
        config
      );
      alert('Menu added successfully!');
    } catch (error) {
      console.error('Error adding menu:', error);
      alert('Failed to add menu');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={productInfo.product_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productInfo.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={productInfo.description}
            onChange={handleInputChange}
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
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            name="category_id"
            value={productInfo.category_id}
            onChange={handleInputChange}
          />
        </div>
        {productInfo.variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            <button type="button" onClick={() => handleDeleteVariant(variantIndex)}>Delete Variant</button>
            <input
              type="text"
              placeholder="Variant Name"
              value={variant.variant_name}
              onChange={(e) =>
                handleVariantChange(variantIndex, 'variant_name', e.target.value)
              }
            />
            {variant.variant_options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  placeholder="Option Name"
                  value={option.variant_option_name}
                  onChange={(e) =>
                    handleOptionChange(
                      variantIndex,
                      optionIndex,
                      'variant_option_name',
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Price Adjustment"
                  value={option.price_adjustment}
                  onChange={(e) =>
                    handleOptionChange(
                      variantIndex,
                      optionIndex,
                      'price_adjustment',
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddOption(variantIndex)}>
              Add Option
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddVariant}>
          Add Variant
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MenuForm;
