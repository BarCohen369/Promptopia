"use client"

import Profile from '@/components/Profile'
import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {Post} from '@/types/feedTypes'
import {fetchPosts} from '@utils/dbFetchFunctions'

const MyProfile = () => {
    const {data: session, status} = useSession()
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const handleEdit = () => {

    }

    useEffect(() => {
        console.log('session', status)

        if (
            status === 'authenticated' && session?.user?._id
        ) fetchPosts(session.user._id)
            .then(res => console.log(res))
        // setUserPosts(data as Post[])
    }, [session])

    /* mock data to test the ui */
    useEffect(() => {
        setUserPosts([{
            prompt: 'Write a short story about a person who discovers a hidden, magical world within their own reflection',
            creator: {
                email: 'email',
                image: 'https://lh3.googleusercontent.com/a/AAcHTtd_3tgev_YRuyzp_421DI9YsKmx0jyhPEdHGd2IPgC_Nw=s96-c',
                username: 'username'
            } as Post['creator'],
            tags: ['tag1', 'tag2', 'tag3'],
            _id: 'id',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    }, [])


    const handleDelete = async () => {

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