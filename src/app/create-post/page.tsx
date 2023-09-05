"use client"

import {Form} from '@components/Form'
import {useState} from 'react'
import {Post} from '@/types/formTypes'
import {useSession} from 'next-auth/react'
import {router} from 'next/client'

const CreatePrompt = ({}) => {
    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: ''
    })


    const createPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    user: session?.user?.email
                })
            })

            if (res.ok) {
                setPost({
                    prompt: '',
                    tag: ''
                })
                router.push('/')
            }
        } catch (e) {
            console.error(e)
        } finally {
                setSubmitting(false)
        }
    }

    return (
        <Form
            type={'Create'}
            post={post}
            setPrompt={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt