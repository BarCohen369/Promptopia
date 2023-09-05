export const Form = () => {
import {FormProps} from '@/types/formTypes'

export const Form = ({type, post, setPrompt, submitting, handleSubmit}: FormProps) => {
    return (
        <section className={'form-wrapper'}>
            <h1 className={'head_text_left'}>
                <span className={'blue_gradient'}>{type} Post</span>
            </h1>
            <p className={'form-desc'}>
                {type} and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform
            </p>

        </section>
    )
}