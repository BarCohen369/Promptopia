import {FormProps} from '@/types/formTypes'
import Link from 'next/link'

export const Form = ({type, post, setPost, submitting, handleSubmit}: FormProps) => {
    return (
        <section className={'form-wrapper'}>
            <h1 className={'head_text_left'}>
                <span className={'blue_gradient'}>{type} Post</span>
            </h1>
            <p className={'form-desc'}>
                {type} and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform
            </p>

            <form
                onSubmit={handleSubmit}
                className={'form'}
            >
                <label>
                    <span className="label_text">
                        Your AI Prompt
                    </span>

                    <textarea
                        className={'form_textarea'}
                        value={post.prompt}
                        onChange={(e) => setPost({...post, prompt: e.target.value})}
                        placeholder={'Write your prompt here'}
                        required
                    />
                </label>

                <label>
                    <span className="label_text">
                        #Tag {` `}
                        <span className={'text-gray-sm'}>
                            (e.g #AI, #product, #art)
                        </span>
                    </span>

                    <input
                        className={'form_input'}
                        value={post.tags}
                        onChange={(e) => setPost({...post, tags: e.target.value})}
                        placeholder={'Separate tags with a comma (,)'}
                    />
                </label>

                <div className="btn-area">
                    <Link href={'/'} className={'text-gray-sm'}>
                        Cancel
                    </Link>

                    <button className={'submit_btn'}
                            type={'submit'}
                            disabled={submitting}
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}