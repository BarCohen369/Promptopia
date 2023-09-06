import {connectToDatabase} from '@utils/database'
import {Post} from '@/types/formTypes'
import User from '@models/user'
import Prompt from '@models/prompt'
import {NextRequest} from 'next/server'

type PostReqParams = {
    user: string,
} & Post & NextRequest

const findUser = async (email: string) => {
    try {
        return await User.findOne({
            email
        })
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
    }
}

export const POST = async (req: PostReqParams) => {
    const {user: email, prompt, tags} = await req.json()

    try {
        await connectToDatabase()
        const user = await findUser(email)

        const newPrompt = new Prompt({
            prompt,
            tags,
            creator: user?._id
        })
        await newPrompt.save()

        console.log('Prompt created')
        return new Response(
            JSON.stringify(
                newPrompt
            ), {
                status: 201
            })
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
        return new Response(
            `Failed to create prompt. Error: ${
                e instanceof Error ? e.message :
                    'Unknown error occurred'
            }`, {
                status: 500
            }
        )
    }
}