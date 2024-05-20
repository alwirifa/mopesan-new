"use client"

import { useVoucherModal } from '@/app/hooks/voucher/useVoucherModal'
import React from 'react'

type Props = {}

const ModalButton = (props: Props) => {
    const voucherModal = useVoucherModal()
    return (
        <>
            <button
                onClick={voucherModal.onOpen}
                className="max-h-max px-6 py-4 bg-secondary text-primary  rounded-lg"
            >
                + Add Voucher
            </button>
        </>
    )
}

export default ModalButton