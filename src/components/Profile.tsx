import {UserProfile} from '@/types/userTypes'

type ProfileProps = {
    type: 'My'
    description: string
    data: UserProfile
    handleEdit: () => void
    handleDelete: () => void
}

const Profile = ({type, description, data, handleEdit, handleDelete}: ProfileProps) => {
    return (
        <div>

        </div>
    )
}

export default Profile