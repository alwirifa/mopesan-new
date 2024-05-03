import React from 'react'

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm

// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://194.233.81.100/api/v1/customers/login', {
//         username,
//         password
//       });
      
//       // Jika login sukses, lakukan sesuatu seperti menyimpan token atau navigasi ke halaman berikutnya
//       console.log('Login berhasil:', response.data);

//       // Reset form setelah berhasil login
//       setUsername('');
//       setPassword('');
//       setErrorMessage('');
//     } catch (error) {
//       // Tangani kesalahan login
//       console.error('Error saat login:', error);
//       setErrorMessage('Username atau password salah.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
