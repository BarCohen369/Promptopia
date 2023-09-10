import {Post} from '@/types/feedTypes'

export type ProfileProps = {
    description: string
    data: Post[]
} & (MyProfileProps | CreatorProfileProps)

export type MyProfileProps = {
    type: 'My'
    handleEdit: (post: Post) => void
    handleDelete: (post: Post) => void
}

export type CreatorProfileProps = {
    type: 'Creator'
    name: string
}