import axios from "axios";
import toast from "react-hot-toast";

export const createNotification = async (
 event: React.FormEvent<HTMLFormElement>,
 feeData: {
   configuration_name: string;
   description: string;
   value_type: string;
 }
) => {
 event.preventDefault();
 try {
   const {  value_type, description, configuration_name,  } = feeData;


   const requestData = {
     
     configuration_name,
     value_type,
     description,
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
   toast.success('Blast Notification added successfully');
 } catch (error) {
   console.error('Error adding merchant:', error);
   toast.error('Failed to add blast notification');
 }
};