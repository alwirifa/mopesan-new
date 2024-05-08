import axios from 'axios';

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

// READ
// export const getBanners = async (): Promise<Banner[]> => {
//   try {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner`);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };

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
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete menu");
    }
  } catch (error) {
    console.error("Error deleting menu:", error);
  }
}