import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { GeneratedImage } from '../../lib/store'

type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeneratedImage[] | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, prompt, format, styleId } = req.body
  const apiKey = process.env.STABLE_API_KEY
  const endpoint = process.env.STABLE_API_URL ||
    'https://api.stability.ai/v2beta/stable-image/generate/sd3'

  if (!apiKey) {
    res.status(500).json({ error: 'Missing STABLE_API_KEY' })
    return
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: styleId ? `${styleId}: ${prompt}` : prompt,
        aspect_ratio: format === '16:9' ? '16:9' : '9:16'
      })
    })

    if (!response.ok) {
      throw new Error(`Stable Diffusion error: ${await response.text()}`)
    }

    const data = await response.json()
    const imgs: GeneratedImage[] = (data.images || []).map((img: string) => ({
      id: uuid(),
      url: `data:image/png;base64,${img}`,
      sceneId,
      promptUsed: prompt
    }))

    res.status(200).json(imgs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate images' })
  }
}

