import {Dispatch, SetStateAction} from 'react'

export type FormProps = {
    children?: React.ReactNode
    submitting: boolean
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
} & (CreateFormProps | EditFormProps)

type CreateFormProps = {
    type: 'Create'
    setPrompt: Dispatch<SetStateAction<Post>>
    post: Post
}

type EditFormProps = {
    type: 'Edit'
    setPrompt: Dispatch<SetStateAction<Post>>
    post: Post
}

export type Post = {
    prompt: string,
    tag: string
}