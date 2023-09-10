"use client"

import Profile from '@/components/Profile'
import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {Post} from '@/types/feedTypes'
import {fetchUserPosts} from '@utils/dbFetchFunctions'
import {useRouter} from 'next/navigation'
import {useNotification} from '@app/contexts/NotificationContext'
import {NotificationContextData} from '@/types/NotificationTypes'

const MyProfile = () => {
    const router = useRouter()
    const {data: session, status} = useSession()
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const {setError, setNotification} = useNotification() as NotificationContextData

    useEffect(() => {
        if (
            status === 'authenticated' && session?.user?._id
        ) fetchUserPosts(session.user._id)
            .then(data => setUserPosts(data as Post[]))
            .catch(e => setError(e.message))
    }, [session])

    const handleEdit = (post: Post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this post?')
        if (!hasConfirmed) return

        try {
            const res = await fetch(`/api/prompt/${post._id}`, {method: 'DELETE'})

            if (res.ok) {
                const filteredPosts = userPosts.filter(p => p._id !== post._id)
                setUserPosts(filteredPosts)
                setNotification({
                    type: 'Success',
                    message: 'Post deleted'
                })
            } else throw new Error(`${res.body}`)
        } catch (e) {
            setError((e as Error).message)
        }
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