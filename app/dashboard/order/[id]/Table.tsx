import React from 'react';
import { OrderDataById } from '@/app/lib/types';

type Props = {
  data: OrderDataById[];
};
  
const Table: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
  
    </div>
  );
};

export default Table;
