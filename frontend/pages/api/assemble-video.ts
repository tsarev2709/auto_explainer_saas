import type { NextApiRequest, NextApiResponse } from 'next';
import { assembleVideo, SceneSegment } from '../../../modules/video-assembler';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ url: string }>) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { scenes, voiceover } = req.body as { scenes: SceneSegment[]; voiceover?: string };
  const url = await assembleVideo(scenes, voiceover);
  res.status(200).json({ url });
}
