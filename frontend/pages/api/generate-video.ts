import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { GeneratedVideo } from '../../lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse<GeneratedVideo>) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, generator, duration, imageUrl, lipsyncText } = req.body
  const video: GeneratedVideo = {
    id: uuid(),
    sceneId,
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    thumbnail: imageUrl,
    generator,
    duration,
    lipsyncUsed: Boolean(lipsyncText)
  }
  res.status(200).json(video)
}
