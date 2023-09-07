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
        <section className={'w-full'}>
            <h1 className={'head_text_left'}>
                <span className={'blue_gradient'}>{type} Profile</span>
            </h1>
            <p className={'desc text-left'}>
                {description}
            </p>


        </section>
    )
}

export default Profile