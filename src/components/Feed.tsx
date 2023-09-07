"use client"

import {useEffect, useState} from 'react'
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
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('search', e.target.value)
        setSearchText(e.target.value)
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

    }

    return (
        <section className={'feed'}>
            <form className={'search_form'}>
                <input
                    type={'text'}
                    className={'search_input peer'}
                    placeholder={'Search for a tag or a user...'}
                    required
                    value={searchText}
                    onChange={handleSearchChange}
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