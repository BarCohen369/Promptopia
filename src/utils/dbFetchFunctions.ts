export const fetchPosts = async (id: string) => {
    console.log('fetching posts')

    try {
        const res = await fetch(
            `/api/users/${id}/posts`,
            {
                method: 'GET'
            }
        )

        console.log(res)
        return await res.json()
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
    }
}