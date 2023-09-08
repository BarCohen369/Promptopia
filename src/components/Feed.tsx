"use client"

import {useEffect, useRef, useState} from 'react'
import {PromptCardList} from '@components/PromptCardList'
import {Post} from '@/types/feedTypes'

export const Feed = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()

            setPosts(data as Post[])
        }

        fetchPosts()
    }, [])

    useEffect(() => {
            handleSearchChange()
        }
    , [searchText])

    const handleSearchChange = () => {
        const results: Post[] = []

        posts.forEach(post => {
            if (post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())) ||
                post.creator.username.toLowerCase().includes(searchText.toLowerCase())
            ) results.push(post)
        })

        setSearchResults(results)
    }

    const handleTagClick = (tag: string) => {
        setSearchText(tag)
    }

    // todo style the x button and add esc functionality
    return (
        <section className={'feed'}>
            <form className={'search_form'}>
                <input
                    type={'search'}
                    className={'search_input peer'}
                    placeholder={'Search for a tag or a user...'}
                    required
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
            </form>

            <PromptCardList
                data={searchText ? searchResults : posts}
                mt={16}
                callbacks={
                    {handleTagClick}
                }
            />
        </section>
    )
}