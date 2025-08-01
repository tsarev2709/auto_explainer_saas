import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { projects, VideoProject } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(projects);
  } else if (req.method === 'POST') {
    const data = req.body;
    const project: VideoProject = { id: uuid(), ...data };
    projects.push(project);
    res.status(201).json(project);
  } else {
    res.status(405).end();
  }
}
