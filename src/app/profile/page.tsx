"use client"

import Profile from '@/components/Profile'

const MyProfile = () => {
    const userData = []
    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }
    return (
        <Profile
            type="My"
            description="Welcome to your personalized profile page"
            data={userData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile