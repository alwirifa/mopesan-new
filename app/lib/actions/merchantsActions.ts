import axios from 'axios';

// CREATE
export const createMerchant = async (
  event: React.FormEvent<HTMLFormElement>,
  merchantData: {
    merchant_name: string,
    location_lat: string, 
    location_long: string, 
    email: string,
    password: string,
    phone_number: string,
    address: string,
    pic_name: string
  }
) => {
  event.preventDefault();
  try {
    const { merchant_name, location_lat, location_long, email, password, phone_number, address, pic_name } = merchantData;

    const requestData = {
      merchant_name,
      location_lat: parseFloat(location_lat), 
      location_long: parseFloat(location_long), 
      email,
      password,
      phone_number,
      address,
      pic_name
    };

    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Admin token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants`, requestData, config);
    alert('Merchant added successfully!');
  } catch (error) {
    console.error('Error adding merchant:', error);
    alert('Failed to add merchant');
  }
};

// READ

// UPDATE
export const updateMerchant = async (
  event: React.FormEvent<HTMLFormElement>,
  id: string,
  merchantData: {
    merchant_name: string,
    location_lat: string,
    location_long: string,
    email: string,
    password: string,
    phone_number: string,
    address: string,
    pic_name: string
  }
) => {
  event.preventDefault();
  try {
    const { merchant_name, location_lat, location_long, email, password, phone_number, address, pic_name } = merchantData;

    const requestData = {
      merchant_name,
      location_lat: parseFloat(location_lat),
      location_long: parseFloat(location_long),
      email,
      password,
      phone_number,
      address,
      pic_name
    };

    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Admin token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants/${id}`, requestData, config);
    alert('Merchant updated successfully!');
  } catch (error) {
    console.error('Error updating merchant:', error);
    alert('Failed to update merchant');
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