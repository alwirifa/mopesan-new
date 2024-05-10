import axios from 'axios';

// CREATE
export const createAdmin = async (
  event: React.FormEvent<HTMLFormElement>,
  adminData: {
    name: string,
    email: string,
    password: string,
  }
) => {
  event.preventDefault();
  try {
    const { name, email, password, } = adminData;

    const requestData = {
      name,
      email,
      password,
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

    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins`, requestData, config);
   
  } catch (error) {
    console.error('Error adding admin:', error);
    alert('Failed to add admin');
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
    const token = localStorage.getItem("admin_token");
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

// UPDATE
export const updateAdmin = async (
  event: React.FormEvent<HTMLFormElement>,
  id: string,
  adminData: {
    name: string,
    email: string,
    password: string,
  }
) => {
  event.preventDefault();
  try {
    const { name, email, password, } = adminData;

    const requestData = {
      name,
      email,
      password,
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

    await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/${id}`, requestData, config);
    alert('admin updated successfully!');
  } catch (error) {
    console.error('Error updating admin:', error);
    alert('Failed to update admin');
  }
};


// DELETE
export async function deleteAdmin(adminId: string): Promise<void> {
  try {
    const token = localStorage.getItem("admin_token");
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