import {UserProfile} from '@/types/userTypes'
import {Post} from '@/types/feedTypes'

type ProfileProps = {
    type: 'My'
    description: string
    data: Post[]
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