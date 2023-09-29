"use client"

import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Post} from '@/types/feedTypes'
import {useNotification} from '@contexts/NotificationContext'
import {NotificationContextData} from '@/types/NotificationTypes'
import {fetchUserPosts} from '@utils/dbFetchFunctions'
import Profile from '@components/Profile'

const Page = ({}) => {
    const router = useRouter()
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const {setError, setNotification} = useNotification() as NotificationContextData

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchUserPosts('64f7053f58801b1073bccd78')
            .then(data => setUserPosts(data as Post[]))
            .catch(e => setError(e.message))
    }, [])

    const handleEdit = (post: Post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this post?')
        if (!hasConfirmed) return

        try {
            const filteredPosts = userPosts.filter(p => p._id !== post._id)
            setUserPosts(filteredPosts)
            setNotification({
                type: 'Success',
                message: 'Post deleted'
            })
        } catch (e) {
            setError((e as Error).message)
        }
    }

    return (
        <>
            <Profile
                type="My"
                description="Welcome to your personalized profile page"
                data={userPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Page