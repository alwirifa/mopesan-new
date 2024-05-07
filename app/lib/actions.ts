import axios from "axios";

// Assuming you have a function or class to handle the deletion logic
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

    // Handle successful deletion (optional)
    if (response.status === 200) {
      console.log("Menu deleted successfully!");
      // You might want to update the UI or redirect to a confirmation page
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to delete menu");
    }
  } catch (error) {
    console.error("Error deleting menu:", error);
    // Handle errors appropriately (e.g., display an error message to the user)
  }
}



interface Menu {
  product_name: string;
  price: number;
  description: string;
}

export const createMenu = async (menuData: Menu) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    console.error("Admin token not found!");
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/menu`,
      menuData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

