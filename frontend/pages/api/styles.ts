import type { NextApiRequest, NextApiResponse } from 'next'

interface Style { id: string; url: string }

export default function handler(_req: NextApiRequest, res: NextApiResponse<Style[]>) {
  const styles: Style[] = [
    { id: 'style-1', url: 'https://via.placeholder.com/150?text=Style+1' },
    { id: 'style-2', url: 'https://via.placeholder.com/150?text=Style+2' },
    { id: 'style-3', url: 'https://via.placeholder.com/150?text=Style+3' },
    { id: 'style-4', url: 'https://via.placeholder.com/150?text=Style+4' }
  ]
  res.status(200).json(styles)
}

