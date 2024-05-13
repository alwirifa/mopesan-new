"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useDebounce } from 'use-debounce'

type Props = {}


const Search = (props: Props) => {
    const [text, setText] = useState('')
    const router = useRouter()
    const [query] = useDebounce(text, 500)

    useEffect(() => {
        console.log(text)
        
        if (!query) {
            router.push(`/tes`)
        } else {
            router.push(`/tes?search=${query}`)

        }
    }, [query, router])

    return (
        <div className="w-full max-w-md px-4 py-2 rounded-md shadow-md flex items-center gap-2 bg-white">
            <MdSearch />
            <input
                type="text"
                className="italic text-textGray outline-none"
                onChange={e => setText(e.target.value)}
            />
        </div>
    )
}

export default Search