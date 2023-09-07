"use client"

import {Form} from '@components/Form'
import {useEffect, useState} from 'react'
import {Post} from '@/types/formTypes'
import {useRouter, useSearchParams} from 'next/navigation'

const EditPrompt = ({}) => {
    const promptID = useSearchParams().get('id')
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState<Post>({
        prompt: '',
        tags: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptID}`)
            const data = await res.json()

            data.tags = data.tags.join(', ')
            setPost(data)
        }

        if (promptID) getPromptDetails()
    }, [promptID])


    const updatePrompt = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)

        try {
            if (!promptID) throw new Error('No prompt ID')

            const res = await fetch(`/api/prompt/${promptID}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tags: post.tags.split(/[\s,#]+/).filter(item => item !== "")
                })
            })

            if (res.ok) {
                setPost({
                    prompt: '',
                    tags: ''
                })
                router.push('/profile')
            }
        } catch (e) {
            console.error(e instanceof Error ? e.message : e)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type={'Edit'}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt