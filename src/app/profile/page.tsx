"use client"

import Profile from '@/components/Profile'
import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {Post} from '@/types/feedTypes'

const MyProfile = () => {
    const {data: session, status} = useSession()
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const handleEdit = () => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                `/api/users/${session?.user?.email}/posts`
            )
            const data = await res.json()

            setUserPosts(data as Post[])
        }

        if (status === 'authenticated') fetchPosts()
    }, [])


    const handleDelete = async () => {

    }
    return (
        <Profile
            type="My"
            description="Welcome to your personalized profile page"
            data={userPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile