import axios from "axios";
import toast from "react-hot-toast";

// Create
export const createVoucher = async (
  event: React.FormEvent<HTMLFormElement>,
  voucherData: {
    voucher_name: string;
    description: string;
    code: string;
    minimum_order: string;
    valid_from: string;
    valid_until: string;
    merchant_id: string;
    discount_value: string;
    type_voucher: string;
    max_discount: string;
    total_voucher_number: string;
  }
) => {
  event.preventDefault();
  try {
    const {
      voucher_name,
      description,
      code,
      minimum_order,
      valid_from,
      valid_until,
      merchant_id,
      discount_value,
      type_voucher,
      max_discount,
      total_voucher_number,
    } = voucherData;

    const requestData = {
      voucher_name,
      description,
      code,
      minimum_order: parseFloat(minimum_order),
      valid_from,
      valid_until,
      merchant_id: parseFloat(merchant_id),
      discount_value: parseFloat(discount_value),
      type_voucher,
      max_discount: parseFloat(max_discount),
      total_voucher_number: parseInt(total_voucher_number),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/vouchers`,
      requestData,
      config
    );
    toast.success("Voucher added successfully");
  } catch (error) {
    console.error("Error adding voucher:", error);
    toast.error("Failed to add voucher");
  }
};

// READ
export const getVouchers = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/vouchers`
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch vouchers");
  }
};

//   DELETE
export const deleteVoucher = async (id: number) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/vouchers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return id; // Mengembalikan id yang dihapus
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error; // Melempar error agar bisa ditangkap di tempat penggunaan
  }
};
