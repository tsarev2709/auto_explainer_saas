import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { GeneratedImage } from '../../lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse<GeneratedImage[]>) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, prompt, format, styleId } = req.body
  const base = format === '16:9' ? 'https://via.placeholder.com/640x360' : 'https://via.placeholder.com/360x640'
  const images: GeneratedImage[] = Array.from({ length: 4 }).map((_, i) => ({
    id: uuid(),
    url: `${base}?text=${styleId || 'style'}+${i + 1}`,
    sceneId,
    promptUsed: prompt
  }))
  res.status(200).json(images)
}

