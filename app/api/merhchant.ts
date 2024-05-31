import axios from 'axios';
import toast from 'react-hot-toast';

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
    pic_name: string,
    opening_hours: string,
    closing_hours: string,
  }
) => {
  event.preventDefault();
  try {
    const { merchant_name, location_lat, location_long, email, password, phone_number, address, pic_name, opening_hours, closing_hours } = merchantData;

    const requestData = {
      merchant_name,
      location_lat: parseFloat(location_lat), 
      location_long: parseFloat(location_long), 
      email,
      password,
      phone_number,
      address,
      pic_name,
      opening_hours,
      closing_hours
    };

    const token = localStorage.getItem('token');
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
    toast.success('Merchant added successfully');
  } catch (error) {
    console.error('Error adding merchant:', error);
    toast.error('Failed to add merchant');
  }
};

// GET DATA BY ID 
export async function getMerchantById(merchantId: string): Promise<void> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants/${merchantId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
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

// GET ORDER MERCHANT 


// READ
export const getMerchants = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/merchants`
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch merchants");
  }
};

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

    const token = localStorage.getItem('token');
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
