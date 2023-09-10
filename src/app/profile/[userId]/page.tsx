"use client"

import Profile from '@/components/Profile'
import {useEffect, useState} from 'react'
import {Post} from '@/types/feedTypes'
import {fetchUserPosts} from '@utils/dbFetchFunctions'
import {useSearchParams} from 'next/navigation'

type Params = {
    userId: string
}

const CreatorProfile = ({params: {userId}}: { params: Params }) => {
    const name = useSearchParams().get('name')
    const [userPosts, setUserPosts] = useState<Post[]>([])

    useEffect(() => {
        fetchUserPosts(userId)
            .then(data => setUserPosts(data as Post[]))
            .catch(e => console.error(e))
    }, [])

    return (
        <>
            <Profile
                type="Creator"
                name={name?? 'Creator'}
                description={`Welcome to ${name?? 'name-not-found'} profile page`}
                data={userPosts}
            />
        </>
    )
}

export default CreatorProfile