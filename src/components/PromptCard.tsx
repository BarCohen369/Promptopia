"use client"

import {Post} from '@/types/feedTypes'
import Image from 'next/image'
import {useState} from 'react'
import {CardCallbacks} from '@components/PromptCardList'

type CardParams = {
    post: Post
} & CardCallbacks

export const PromptCard = ({post, callbacks}: CardParams) => {
    const [copied, setCopied] = useState('')
    const {
        handleDelete,
        handleEdit,
        handleTagClick
    } = callbacks
    const handleCopy = () => {
        navigator.clipboard.writeText(post.prompt)
        setCopied(post.prompt)
        setTimeout(() => setCopied(''), 3000)
    }

    return (
        <li className={'prompt_card'}>
            <div className="flex-between">
                <section className="creator_data">
                    <div className="creator_image_wrapper">
                        <Image
                            src={post.creator.image || ''}
                            alt={'user profile'}
                            width={40}
                            height={40}
                            className={'rounded-full object-contain'}
                        />
                    </div>

                    <div className="flex_col">
                        <h3 className={'creator_username'}>
                            {post.creator.username}
                        </h3>
                        <p className={'creator_email'}>
                            {post.creator.email}
                        </p>
                    </div>
                </section>

                <section className={'flex-end'}>
                    <button
                        className="copy_btn"
                        onClick={handleCopy}
                    >
                        <Image
                            src={copied === post.prompt ?
                                '/assets/icons/tick.svg' :
                                '/assets/icons/copy.svg'}
                            alt={'copy'}
                            height={12}
                            width={12}
                        />
                    </button>

                    {handleEdit && (
                        <button
                            className={'edit_btn'}
                            onClick={handleEdit}
                        >
                            <Image
                                src={'/assets/icons/edit.svg'}
                                alt={'edit'}
                                height={12}
                                width={12}
                            />
                        </button>
                    )}

                    {handleDelete && (
                        <button
                            className={'delete_btn'}
                            onClick={handleDelete}
                        >
                            <Image
                                src={'/assets/icons/delete.svg'}
                                alt={'delete'}
                                height={12}
                                width={12}
                            />
                        </button>
                    )}
                </section>
            </div>

            <p className={'prompt'}>{post.prompt}</p>
            <section className="tag_section">
                {post.tags.map((tag) => (
                    <button
                        key={tag}
                        className={'tag_btn'}
                        disabled={!handleTagClick}
                        onClick={() => handleTagClick && handleTagClick(tag)}
                    >
                        #{tag}
                    </button>
                ))}
            </section>
        </li>
    )
}
