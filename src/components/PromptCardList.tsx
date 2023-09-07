import {Post} from '@/types/feedTypes'
import {PromptCard} from '@components/PromptCard'

type Props = {
    data: Post[],
    handleTagClick: () => void
}

export const PromptCardList = ({data, handleTagClick}: Props) => {
    return (
        <ul className={'prompt_layout'}>
            {data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </ul>
    )
}