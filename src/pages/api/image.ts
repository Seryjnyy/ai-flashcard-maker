import openai from '@/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // const body = JSON.parse(req.body)
    // const {description} = body || {};
    // use description in request prompt
    const response = await openai.createImage({
        // Bings competitor, a search engine
        // Google
        // Colonel Sanders, the logo of a chicken fast food store
        prompt: "Colonel Sanders, the logo of a chicken fast food store",
        n:2,
        size:"512x512"
    })

    res.status(200).json({
       images: response.data.data 
    })

}