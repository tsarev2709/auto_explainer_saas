import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, to4k, to60fps } = req.body
  // Mock upscale
  res.status(200).json({ ok: true })
}
