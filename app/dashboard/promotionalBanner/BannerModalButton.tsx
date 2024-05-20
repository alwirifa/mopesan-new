"use client"

import { useBannerModal } from '@/app/hooks/banner/useBannerModal'
import React from 'react'

type Props = {}

const BannerModalButton = (props: Props) => {
    const voucherModal = useBannerModal()
    return (
        <>
            <button
                onClick={voucherModal.onOpen}
                className="max-h-max px-6 py-4 bg-secondary text-primary rounded-lg"
            >
                + Add Promotional Banner
            </button>
        </>
    )
}

export default BannerModalButton