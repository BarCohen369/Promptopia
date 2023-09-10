import {Post as FeedPost} from '@/types/feedTypes'

export const fetchUserPosts = async (id: string): Promise<FeedPost[] | undefined> => {
    console.log('fetching posts for user ', id)

    try {
        const res = await fetch(
            `/api/users/${id}/posts`,
            {
                method: 'GET'
            }
        )

        return await res.json()
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
    }
}

export const fetchAllPosts = async (): Promise<FeedPost[] | undefined> => {
    try {
        const res = await fetch('/api/prompt')
        return await res.json()
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
    }
}
