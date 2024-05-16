// Table.tsx

import React from 'react';
import { OrderDataById } from '@/app/lib/types';
import { formatCurrency} from '@/app/lib/formatters';

type Props = {
  data: OrderDataById;
};

const Table: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
      <table className="w-full">
        <thead>
          <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
            <th className="border-r border-black px-2 py-4 text-center">
              No.
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Menu
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Selected Customitation
            </th>

            <th className=" border-black px-6 py-4 text-left">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {data.order_item_response.map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-100 ">
              <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                {index + 1}.
              </td>
              <td className="py-2 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                <div className='flex gap-2 items-center'>
                  <img src={order.product_image} alt="product-image" className='h-auto w-16' />
                  <div className='flex flex-col'>
                    <p className='text-xl font-semibold'>
                      {order.product_name}
                    </p>

                  </div>
                </div>
              </td>
              <td className="py-4 px-6  font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {order.selected_customization.length > 0 ? (
                  order.selected_customization.map((custom, index) => (
                    <div key={index} className='flex gap-1'>
                      <p>{custom.selected_customization_key}</p>
                      <p>{custom.selected_customization_value}</p>
                    </div>
                  ))
                ) : (
                  <p>-</p>
                )}
              </td>

              <td className="py-4 px-6 font-medium border-t  border-black text-gray-900 whitespace-nowrap">
                {formatCurrency(order.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
