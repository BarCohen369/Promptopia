import {NextRequest} from 'next/server'
import {connectToDatabase} from '@utils/database'
import Prompt from '@models/prompt'
import { Post } from '@/types/feedTypes'

export const GET = async ({req}: { req: NextRequest }) => {
    try {
        await connectToDatabase()

        const propmts = await Prompt.find({})
            .populate('creator') as Post[]

        console.log(propmts)

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