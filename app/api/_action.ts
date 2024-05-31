import { getCustomers } from "./customer";
import { getVouchers } from "./voucher";


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

export async function GetCustomer({
  search,
  offset = 0,
  limit = 1,
}: {
  search?: string | undefined,
  offset?: number,
  limit?: number
}) {
  let customers = await getCustomers();

  if (search) {
    customers = customers.filter((voucher: { full_name: string; }) =>
      voucher.full_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalCount = customers.length;

  const paginatedVouchers = customers.slice(offset, offset + limit);

  const totalPages = Math.ceil(totalCount / limit);

  return { data: paginatedVouchers, totalCount, totalPages };
}

