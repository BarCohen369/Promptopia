"use client"

import {Form} from '@components/Form'
import {useState} from 'react'
import {Post} from '@/types/formTypes'

const CreatePrompt = ({}) => {
    const [submitting, setSubmitting] = useState(false)
    const [prompt, setPrompt] = useState<Post>({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (event: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <Form
            type={'Create'}
            post={prompt}
            setPrompt={setPrompt}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt