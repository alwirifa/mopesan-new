import axios from 'axios';
import toast from 'react-hot-toast';

// CREATE
export const createFee = async (
  event: React.FormEvent<HTMLFormElement>,
  feeData: {
    configuration_name: string;
    description: string;
    value_type: string;
    value: string
  }
) => {
  event.preventDefault();
  try {
    const {  value_type, description, configuration_name, value  } = feeData;


    const requestData = {
      
      configuration_name,
      value_type,
      description,
      value : parseFloat(value)
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

    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/config-fee`, requestData, config);
    toast.success('Additional Fee added successfully');
  } catch (error) {
    console.error('Error adding merchant:', error);
    toast.error('Failed to add additional fee');
  }
};

export const getFee = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/config-fee`
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch admins");
  }
};
