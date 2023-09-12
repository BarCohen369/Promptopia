"use client"

import {Form} from '@components/Form'
import {useState} from 'react'
import {Post} from '@/types/formTypes'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {useNotification} from '@contexts/NotificationContext'
import {NotificationContextData} from '@/types/NotificationTypes'

const CreatePrompt = ({}) => {
    const {data: session} = useSession()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const {setError, setNotification} = useNotification() as NotificationContextData
    const [post, setPost] = useState<Post>({
        prompt: '',
        tags: ''
    })


    const createPrompt = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tags: post.tags.split(/[\s,#]+/).filter(item => item !== ""),
                    user: session?.user?._id
                })
            })

            if (res.ok) {
                setPost({
                    prompt: '',
                    tags: ''
                })
                setNotification({
                    type: 'Success',
                    message: 'Prompt created'
                })
                router.push('/')
            } else throw new Error('One or more fields are invalid')
        } catch (e) {
            setError((e as Error).message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type={'Create'}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt