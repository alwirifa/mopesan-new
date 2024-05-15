import axios from 'axios';
import { Category, Menu } from '@/app/lib/types/index'

// CREATE
export const createMenu = async (
  event: React.FormEvent<HTMLFormElement>,
  file: File | null,
  productName: string,
  price: string,
  description: string
) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('image', file as Blob);
    formData.append(
      'menu',
      JSON.stringify({
        product_name: productName,
        price: parseFloat(price),
        description: description
      })
    );

    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Admin token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/menu`, formData, config);
    alert('Menu added successfully!');
  } catch (error) {
    console.error('Error adding menu:', error);
    alert('Failed to add menu');
  }
};

// GET DATA BY ID 
export async function getMenuByID(MenuId: string): Promise<void> {
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/menu/${MenuId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("get by id successfully!");
      const { data } = response.data;
      return data;
   
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to fetch admin");
      
    }
  } catch (error) {
    console.error("Error get data by id:", error);
  }
}

// READ
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/category-full`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getMenus = async (): Promise<Menu[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/menu`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return [];
  }
};


// UPDATE
export const updateMenu = async (
  event: React.FormEvent<HTMLFormElement>,
  id: string,
  file: File | null,
  productName: string,
  price: string,
  description: string
) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    if (file) {
      formData.append('image', file as Blob);
    }
    formData.append(
      'menu',
      JSON.stringify({
        product_name: productName,
        price: parseFloat(price),
        description: description
      })
    );

    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Admin token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/menu/${id}`, formData, config);
    alert('Menu updated successfully!');
  } catch (error) {
    console.error('Error updating menu:', error);
    alert('Failed to update menu');
  }
};

// DELETE
export async function deleteMenu(menuId: string): Promise<void> {
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/menu/${menuId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Menu deleted successfully!");
      alert("Menu deleted successfully!")
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete menu");
      
    }
  } catch (error) {
    console.error("Error deleting menu:", error);
  }
}