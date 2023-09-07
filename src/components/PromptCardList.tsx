import {Post} from '@/types/feedTypes'
import {PromptCard} from '@components/PromptCard'

type Props = {
    data: Post[],
    mt: number
} & CardCallbacks

export type CardCallbacks = {
    callbacks:{
        handleTagClick?: (tag: string) => void
        handleEdit?: () => void
        handleDelete?: () => void
    }
}

export const PromptCardList = ({data, mt, callbacks}: Props) => {
    return (
        <ul className={'prompt_layout'} style={{marginTop: `${mt / 4}rem`}}>
            {data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    callbacks={callbacks}
                />
            ))}
        </ul>
    )
}