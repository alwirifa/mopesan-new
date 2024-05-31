"use client"

const Table = () => {

  return (
    <div>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-8">
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
                NIP
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Role
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Merhchant Location
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Last Login
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Duration Logged In
              </th>
              <th className=" border-black px-6 py-4 text-left">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 ">
              <td className="border-t border-r border-black px-4 py-2 font-medium text-center">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">

              </td>
              <td className="py-4 px-6 text-sm font-medium border-t  border-black text-gray-900 whitespace-nowrap">
                View Detail
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;