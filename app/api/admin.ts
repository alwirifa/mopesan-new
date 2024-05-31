import axios from 'axios';
import toast from 'react-hot-toast';

// CREATE
export const createAdmin = async (adminData: {
  name: string,
  email: string,
  password: string,
  roleID: string,
  merchantID: string
}) => {
  try {
    const { name, email, password, roleID, merchantID } = adminData;

    const requestData = {
      name,
      email,
      password,
      role_id: parseInt(roleID),
      merchant_id: parseInt(merchantID)
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins`, requestData, config);
    toast.success('Merchant added successfully');
  } catch (error) {
    console.error('Error adding admin:', error);
    toast.error('Failed to add merchant');
    throw error;
  }
};


// READ
export const getAdmins = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins`
    );
    const { data } = response.data;
    console.log("admins data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch admins");
  }
};

// GET DATA BY ID 
export async function getAdmin(adminId: string): Promise<void> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/${adminId}`,
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

export const updateAdmin = async (
  id: string,
  adminData: {
    name: string,
    email: string,
    password: string,
    roleID: string,
    merchantID: string
  }
) => {
  try {
    const { name, email, password, roleID, merchantID } = adminData;

    const requestData = {
      name,
      email,
      password,
      role_id: parseInt(roleID),
      merchant_id: parseInt(merchantID)
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

    await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/${id}`, requestData, config);
    alert('Admin updated successfully!');
  } catch (error) {
    console.error('Error updating admin:', error);
    alert('Failed to update admin');
  }
};



// DELETE
export async function deleteAdmin(adminId: string): Promise<void> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/${adminId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Admin deleted successfully!");
      alert("Admin deleted successfully!")
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete Admin");
      
    }
  } catch (error) {
    console.error("Error deleting Admin:", error);
  }
}