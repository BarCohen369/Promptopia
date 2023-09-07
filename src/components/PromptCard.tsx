"use client"

import {Post} from '@/types/feedTypes'
import Image from 'next/image'
import {useState} from 'react'

type CardParams = {
    handleTagClick: () => void
    post: Post
}

export const PromptCard = ({handleTagClick, post}: CardParams) => {
    const [copied, setCopied] = useState('')
    const handleCopy = () => {
        navigator.clipboard.writeText(post.prompt)
        setCopied(post.prompt)
    }

    return (
        <li className={'prompt_card'}>
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
                        post.creator.username
                    </h3>
                    <p className={'creator_email'}>
                        post.creator.email
                    </p>
                </div>
            </section>

            <button className="copy_btn" onClick={handleCopy}>
                <Image
                    src={copied === post.prompt ?
                        '/assets/images/tick.svg' :
                        '/assets/images/copy.svg'}
                    alt={'copy'}
                    height={12}
                    width={12}
                />
            </button>
        </li>
    )
}