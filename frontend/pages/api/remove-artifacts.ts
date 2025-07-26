import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, artifactFrames } = req.body
  // Mock removal action
  res.status(200).json({ ok: true })
}
