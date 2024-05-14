import { getVouchers } from './voucherAction';

export async function GetVoucher({
  search,
  offset = 0,
  limit = 1,
}: {
  search?: string | undefined,
  offset?: number,
  limit?: number
}) {
  let vouchers = await getVouchers();

  if (search) {
    vouchers = vouchers.filter((voucher: { voucher_name: string; }) =>
      voucher.voucher_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalCount = vouchers.length;

  const paginatedVouchers = vouchers.slice(offset, offset + limit);

  const totalPages = Math.ceil(totalCount / limit);

  return { data: paginatedVouchers, totalCount, totalPages };
}
