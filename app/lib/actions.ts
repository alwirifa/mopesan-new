

// // import axios from 'axios';

// // export const login = async (formData: FormData) => {
// //   try {
// //     const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/login`, formData);
// //     return response.data;
// //   } catch (error) {
// //     throw new Error('Login failed');
// //   }
// // };

// // export const logout = async () => {
// //   try {
// //     await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/logout`);
// //   } catch (error) {
// //     throw new Error('Logout failed');
// //   }
// // };


// import axios from "axios";

// export const deleteVoucher = async (voucherId: number) => {
//   try {
//     const adminToken = localStorage.getItem("admin_token");
//     if (!adminToken) {
//       throw new Error("Admin token not found");
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//       },
//     };

//     const response = await axios.delete(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/vouchers/${voucherId}`,
//       config
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error(`Error deleting voucher: ${error.message}`);
//   }
// };
