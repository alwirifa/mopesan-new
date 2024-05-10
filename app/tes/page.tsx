"use client"

// UserTypeDisplay.tsx
import React from 'react';
import { useAuth, UserRole } from '@/app/context/authContex';

const UserTypeDisplay: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <div>
      {userRole !== null && (
        <p>User type: {userRole === UserRole.Admin ? 'Admin' : 'Superadmin'}</p>
      )}
    </div>
  );
};

export default UserTypeDisplay;
