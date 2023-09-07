"use client"

import Profile from '@/components/Profile'
import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {Post} from '@/types/feedTypes'
import {fetchPosts} from '@utils/dbFetchFunctions'
import {useRouter} from 'next/navigation'

const MyProfile = () => {
    const router = useRouter()
    const {data: session, status} = useSession()
    const [userPosts, setUserPosts] = useState<Post[]>([])

    useEffect(() => {
        if (
            status === 'authenticated' && session?.user?._id
        ) fetchPosts(session.user._id)
            .then(data => setUserPosts(data as Post[]))
    }, [session])

    const handleEdit = (post: Post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post: Post) => {

    }

    return (
        <>
            {(status === 'authenticated') &&
                <Profile
                    type="My"
                    description="Welcome to your personalized profile page"
                    data={userPosts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            }
        </>
    )
}

export default MyProfile