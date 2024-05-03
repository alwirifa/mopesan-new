import React from 'react'

type Props = {}

const LogoutButton = (props: Props) => {
  return (
    <div>LogoutButton</div>
  )
}

export default LogoutButton

// import React from 'react';
// import axios from 'axios';

// const LogoutButton = ({ userId }) => {
//   const handleLogout = async () => {
//     try {
//       await axios.post(`http://194.233.81.100/api/v1/auth/customers/logout/${userId}`);
//       // Lakukan sesuatu setelah berhasil logout, misalnya menghapus token dari penyimpanan lokal
//       console.log('Logout berhasil');
//     } catch (error) {
//       // Tangani kesalahan logout
//       console.error('Error saat logout:', error);
//     }
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default LogoutButton;
