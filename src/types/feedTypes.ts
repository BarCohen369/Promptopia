import {UserProfile} from '@/types/userTypes'

export type Post = {
    _id: string
    prompt: string,
    tags: string[]
    creator: Creator,
    createdAt: Date,
    updatedAt: Date
}

export type Creator = {
    _id: string
} & UserProfile