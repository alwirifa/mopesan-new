import axios from 'axios';

// CREATE

export const createBanner = async (
  event: React.FormEvent<HTMLFormElement>,
  file: File | null,
  bannerName: string,
  description: string
) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append(
      'banner',
      JSON.stringify({
        banner_name: bannerName,
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

    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/banner`, formData, config);
    alert('Banner added successfully!');
  } catch (error) {
    console.error('Error adding banner:', error);
    alert('Failed to add banner');
  }
};

// GET DATA BY ID 
export async function getBannerByID(adminId: string): Promise<void> {
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner/${adminId}`,
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
export const getBanners = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// UPDATE
export const updatebanner = async (
  event: React.FormEvent<HTMLFormElement>,
  id: string,
  file: File | null,
  productName: string,
  description: string
) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    if (file) {
      formData.append('image', file as Blob);
    }
    formData.append(
      'banner',
      JSON.stringify({
        product_name: productName,
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

    await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/banner/${id}`, formData, config);
    alert('banner updated successfully!');
  } catch (error) {
    console.error('Error updating banner:', error);
    alert('Failed to update banner');
  }
};

// DELETE
export const deleteBanner = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/banner/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("banner deleted successfully!");
      alert("banner deleted successfully!")
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete banner");
    }
  } catch (error) {
    console.error("Error deleting banner:", error);
  }
}