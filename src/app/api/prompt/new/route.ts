import {connectToDatabase} from '@utils/database'
import {Post} from '@/types/formTypes'
import {Request} from 'next/dist/compiled/@edge-runtime/primitives'
import User from '@models/user'
import Prompt from '@models/prompt'

type PostReqParams = {
    user: string,
} & Post & Request

const findUser = async (email: string) => {
    try {
        return await User.findOne({
            email
        })
    } catch (e) {
        console.error(e)
    }
}

export const POST = async (req: PostReqParams) => {
    const {user: email, prompt, tag} = await req.json()

    try {
        await connectToDatabase()
        const user = await findUser(email)

        const newPrompt = new Prompt({
            prompt,
            tag,
            creator: user?._id
        })
        await newPrompt.save()

        return new Response(
            JSON.stringify(
                newPrompt
            ), {
                status: 201
            })
    } catch (e) {
        console.error(e)
        return new Response(
            'Failed to create prompt', {
                status: 500
            }
        )
    }
}