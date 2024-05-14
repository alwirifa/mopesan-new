import { Voucher } from '@/app/lib/types';

export default async function CardList({ data }: { data: Voucher[] }) {
    return (


        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
            <table className="w-full">
                <thead>

                    <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
                        <th className="border-r border-black px-4 py-4 text-center">
                            No.
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Voucher Name
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Deskripsi
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Jenis Potongan
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Besar Potongan
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Minimal Pembelian
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Maksimal Potongan
                        </th>
                        <th className=" border-black px-4 py-4 text-left"></th>
                    </tr>

                </thead>
                <tbody>

                    {data.map((voucher, index) => (
                        <tr key={voucher.id} className="hover:bg-gray-100 ">
                            <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">
                                {index + 1}.
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {voucher.voucher_name}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {voucher.description}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {voucher.type_voucher}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {voucher.value}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {voucher.minimum_order}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {voucher.max_discount}{" "}
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