import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { sceneId, videoUrl } = req.body
  // Mock analysis result
  const result = {
    artifactFrames: [1, 15, 30],
    type: 'blur',
    qualityScore: 78
  }

  res.status(200).json(result)
}
