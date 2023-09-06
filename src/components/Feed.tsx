"use client"

import {useState} from 'react'

export const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <section className={'feed'}>
            <form className={'search_form'}>
                <input
                    type={'text'}
                    className={'search_input peer'}
                    placeholder={'Search for a tag ot a user...'}
                    required
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </form>

        </section>
    )
}