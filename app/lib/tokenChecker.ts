// tokenChecker.ts
import { decodeToken } from './authUtils'; // Impor fungsi untuk mendekode token

// Tipe untuk role pengguna
export enum UserRole {
  Admin = 'admin',
  super_admin = 'super_admin',
}

// Fungsi untuk memeriksa token pengguna dan mengembalikan tipe pengguna
export const checkUserToken = async (): Promise<UserRole | null> => {
  // Ambil token dari local storage
  const adminToken = localStorage.getItem('admin_token');

  if (adminToken) {
    // Mendekode token admin
    const decodedAdminToken = decodeToken(adminToken);

    if (decodedAdminToken) {
      // Mengakses informasi pengguna dari token
      const { role } = decodedAdminToken;

      console.log("role token", role)
      // Lakukan pengecekan berdasarkan informasi pengguna
      if (role === UserRole.Admin || role === UserRole.super_admin) {
        return role;
      }
    }
  }

  return null;
};
