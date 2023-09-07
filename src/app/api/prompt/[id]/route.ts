import {NextRequest} from 'next/server'
import {connectToDatabase} from '@utils/database'
import Prompt from '@models/prompt'
import {Post} from '@/types/feedTypes'

type Params = {
    params: {
        id: string
    }
}

export const GET = async (req: NextRequest, {params}: Params) => {

    try {
        await connectToDatabase()

        const prompt = await Prompt.findById(params.id)
            .populate('creator') as Post[]

        if (!prompt) {
            return new Response(
                'Prompt not found'
            ), {
                status: 404
            }
        }

        return new Response(
            JSON.stringify(
                prompt
            ), {
                status: 200
            })
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
        return new Response(
            `Failed to fetch prompt. Error: ${
                e instanceof Error ? e.message :
                    'Unknown error occurred'
            }`, {
                status: 500
            }
        )
    }
}

// Update
type EditParams = {
    prompt: string
    tags: string[]
}
export const PATCH = async (req: NextRequest, {params}: Params) => {
    const {prompt, tags} = await req.json() as EditParams

    try {
        await connectToDatabase()

        let existPrompt = await Prompt.findById(params.id)

        if (!existPrompt) {
            return new Response(
                'Prompt not found'
            ), {
                status: 404
            }
        }

        existPrompt.prompt = prompt
        existPrompt.tags = tags

        await existPrompt.save()

        return new Response(
            JSON.stringify(
                existPrompt
            ), {
                status: 200
            }
        )
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
        return new Response(
            `Failed to update prompt. Error: ${
                e instanceof Error ? e.message :
                    'Unknown error occurred'
            }`, {
                status: 500
            }
        )
    }
}

// Delete
export const DELETE = async (req: NextRequest, {params}: Params) => {
    try {
        await connectToDatabase()
        await Prompt.findByIdAndRemove(params.id)

        return new Response(
            'Prompt deleted successfully', {
                status: 200
            }
        )
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
        return new Response(
            `Failed to delete prompt. Error: ${
                e instanceof Error ? e.message :
                    'Unknown error occurred'
            }`, {
                status: 500
            }
        )
    }
}