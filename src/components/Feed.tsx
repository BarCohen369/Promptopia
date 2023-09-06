"use client"

import {useEffect, useState} from 'react'
import {PromptCardList} from '@components/PromptCardList'

export type Post = {
    prompt: string,
    tags: string[]
}

export const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()

            setPosts(data as Post[])
        }

        fetchPosts()
    }, [])
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