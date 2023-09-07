import {NextRequest} from 'next/server'
import {connectToDatabase} from '@utils/database'
import Prompt from '@models/prompt'
import { Post } from '@/types/feedTypes'
import {Params} from 'next/dist/shared/lib/router/utils/route-matcher'

type GetParams = {
    req: NextRequest
    params: {
        id: string
    }
}

export const GET = async ({req, params}: GetParams) => {
        console.log('params', params)
    try {
        await connectToDatabase()

        const propmts = await Prompt.find({
            creator: params.id
        })
            .populate('creator') as Post[]

        return new Response(
            JSON.stringify(
                propmts
            ), {
                status: 200
            })
    } catch (e) {
        console.error(e instanceof Error ? e.message : e)
        return new Response(
            `Failed to fetch prompts. Error: ${
                e instanceof Error ? e.message :
                    'Unknown error occurred'
            }`, {
                status: 500
            }
        )
    }
}