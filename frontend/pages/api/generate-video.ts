import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { GeneratedVideo } from '../../lib/store'

type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneratedVideo | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, generator, duration, imageUrl, lipsyncText, apiKey } = req.body

  let endpoint = ''
  let payload: Record<string, unknown> = {}
  if (generator === 'kling') {
    endpoint = process.env.KLING_API_URL || ''
    payload = { image: imageUrl, text: lipsyncText, duration }
  } else {
    endpoint = process.env.WAV21_API_URL || ''
    payload = { image: imageUrl, prompt: lipsyncText, duration }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Video generation error: ${await response.text()}`)
    }

    const data = await response.json()
    const video: GeneratedVideo = {
      id: uuid(),
      sceneId,
      url: data.url || data.video_url,
      thumbnail: imageUrl,
      generator,
      duration,
      lipsyncUsed: Boolean(lipsyncText)
    }
    res.status(200).json(video)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate video' })
  }
}
