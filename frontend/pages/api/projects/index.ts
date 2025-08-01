import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { Project } from '../../../lib/store'

let projects: Project[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(projects)
  } else if (req.method === 'POST') {
    const data = req.body
    const project: Project = {
      id: uuid(),
      companyName: data.companyName,
      sphere: data.sphere,
      description: data.description,
      niche: data.niche,
      mission: data.mission,
      createdAt: new Date().toISOString(),
      products: []
    }
    projects.push(project)
    res.status(201).json(project)
  } else {
    res.status(405).end()
  }
}
