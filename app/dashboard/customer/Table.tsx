import { Customer } from '@/app/lib/types';

export default async function CardList({ data }: { data: Customer[] }) {
  return (


    <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
      <table className="w-full">
        <thead>

          <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
            <th className="border-r border-black px-4 py-4 text-center">
              No.
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Name
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Email
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Phone Number
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Amount Spend this month
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Jumlah Klaim
            </th>
            <th className=" border-black px-4 py-4 text-left"></th>
          </tr>

        </thead>
        <tbody>

          {data.map((customer, index) => (
            <tr key={customer.id} className="hover:bg-gray-100 ">
              <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">
                {index + 1}.
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.full_name}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.email}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.phone_number}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.monthly_spend_amount}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.rewards_redeemed_count}{" "}
              </td>
              <td className="border-t  border-black px-4 py-2">

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )

}