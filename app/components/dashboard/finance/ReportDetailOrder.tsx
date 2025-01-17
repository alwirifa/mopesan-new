import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type ReportItem = {
  title: string;
  description: string;
  image: string;
  viewImage?: string;
  viewClick?: () => void;
};

type Props = {
  reportItems: ReportItem[];
};

const ReportItem = ({
  title,
  description,
  image,
  viewImage,
  viewClick,
}: ReportItem) => (
  <div className="px-4 py-3 border rounded-md flex justify-between items-center">
    <div className="flex gap-4">
      <Image src={image} alt="logo" height={36} width={36} />
      <div className="space-y-1">
        <p className="text-[15px] font-semibold">{title}</p>
        <p className="text-[12px] text-textGray">{description}</p>
      </div>
    </div>
    {viewImage && <Image src={viewImage} alt="view" height={36} width={36} />}
  </div>
);

const ReportDetailOrder = () => {
  const router = useRouter();
  return (
    <div>
      {/* =================  Report detail  =============== */}
      <div className="bg-white p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold">Report Detail Order</h1>
          <div className="grid grid-cols-3 gap-6">
            <Link href={`/dashboard/report/order-sales`}>
              <ReportItem
                title="By Order method"
                description="Filter based on order method"
                image="/icons/finance/Purchase_.svg"
              />
            </Link>
            <Link href={`/dashboard/report/payment-method-sales`}>
              <ReportItem
                title="By Payment Method"
                description="Filter based on payment"
                image="/icons/finance/payment.svg"
              />
            </Link>
            <Link href={`/dashboard/report/product-sales`}>
              <ReportItem
                title="Most Liked Item"
                description="Filter based on most ordered item"
                image="/icons/finance/Wishlist_.svg"
              />
            </Link>
            <Link href={`/dashboard/report/merchant-sales`}>
              <ReportItem
                title="Most Active Merchant"
                description="Filter based on active merchant"
                image="/icons/finance/Shop_.svg"
                viewImage="/icons/finance/chevron-right.svg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailOrder;
