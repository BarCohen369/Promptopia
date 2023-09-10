import {PromptCardList} from '@components/PromptCardList'
import {CreatorProfileProps, MyProfileProps, ProfileProps} from '@/types/profileTypes'

const Profile = ({type, description, data, ...rest}: ProfileProps) => {
    const {handleDelete, handleEdit} = rest as MyProfileProps
    const {name} = rest as CreatorProfileProps

    return (
        <section className={'w-full'}>
            <h1 className={'head_text_left'}>
                <span className={'blue_gradient'}>{type} Profile</span>
            </h1>
            <p className={'desc text-left'}>
                {description}
            </p>

            <h3 className={'profile-prompts-headline'}>{type === 'My' ? 'Your' : name} Prompts</h3>

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