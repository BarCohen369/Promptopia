import {Post} from '@/types/feedTypes'
import {PromptCardList} from '@components/PromptCardList'

type ProfileProps = {
    type: 'My'
    description: string
    data: Post[]
    handleEdit: (post: Post) => void
    handleDelete: (post: Post) => void
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

            <h3 className={'profile-prompts-headline'}>{type === 'My' ? 'Your' : ''} Prompts</h3>

            <PromptCardList
                data={data}
                mt={0}
                callbacks={
                    {handleDelete, handleEdit}
                }
            />
        </section>
    )
}

export default Profile