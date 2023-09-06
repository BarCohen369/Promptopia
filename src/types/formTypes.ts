import {Dispatch, SetStateAction} from 'react'

export type FormProps = {
    children?: React.ReactNode
    submitting: boolean
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
} & (CreateFormProps | EditFormProps)

type CreateFormProps = {
    type: 'Create'
    setPost: Dispatch<SetStateAction<Post>>
    post: Post
}

type EditFormProps = {
    type: 'Edit'
    setPost: Dispatch<SetStateAction<Post>>
    post: Post
}

export type Post = {
    prompt: string,
    tags: string
}