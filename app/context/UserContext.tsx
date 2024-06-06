"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext<any | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setReady(true);
          return;
        }
  
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setUser(response.data.data);
      } catch (error) {
      } finally {
        setReady(true);
      }
    };
  
    fetchProfileData(); 
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
