"use client"

import {Form} from '@components/Form'
import {useEffect, useState} from 'react'
import {Post} from '@/types/formTypes'
import {NotificationContextData} from '@/types/NotificationTypes'
import {useRouter, useSearchParams} from 'next/navigation'
import {useNotification} from '@contexts/NotificationContext'

const EditPrompt = ({}) => {
    const promptID = useSearchParams().get('id')
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const {setError, setNotification} = useNotification() as NotificationContextData
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

            console.log(res)
            if (res.ok) {
                setPost({
                    prompt: '',
                    tags: ''
                })
                setNotification({
                    type: 'Success',
                    message: 'Prompt updated'
                })
                router.push('/profile')
            } else throw new Error('One or more fields are invalid')
        } catch (e) {
            console.error(e instanceof Error ? e.message : e)
            setError((e as Error).message)
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