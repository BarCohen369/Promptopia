"use client"

import {Post} from '@/types/feedTypes'
import Image from 'next/image'

type CardParams = {
    handleTagClick: () => void
    post: Post
}

export const PromptCard = ({handleTagClick, post}: CardParams) => {
    return (
        <></>
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
        </li>
    )
}