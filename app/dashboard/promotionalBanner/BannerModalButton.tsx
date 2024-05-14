"use client"

import { useBannerModal } from '@/app/hooks/banner/useBannerModal'
import { useVoucherModal } from '@/app/hooks/voucher/useVoucherModal'
import React from 'react'

type Props = {}

const BannerModalButton = (props: Props) => {
    const bannerModal = useBannerModal()
    return (
        <>
            <button
                onClick={bannerModal.onOpen}
                className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
            >
                + Add Voucher
            </button>
        </>
    )
}

export default BannerModalButton