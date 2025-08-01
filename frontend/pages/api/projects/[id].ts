import type { NextApiRequest, NextApiResponse } from 'next';
import { projects } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  const project = projects.find((p) => p.id === id);
  if (!project) {
    return res.status(404).end();
  }
  if (req.method === 'GET') {
    return res.status(200).json(project);
  }
  if (req.method === 'PUT') {
    Object.assign(project, req.body);
    return res.status(200).json(project);
  }
  return res.status(405).end();
}
