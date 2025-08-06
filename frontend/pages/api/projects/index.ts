import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.PROJECT_API_URL || 'http://localhost:4000/api/projects'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const r = await fetch(API_URL, {
        headers: { Authorization: req.headers.authorization || '' }
      })
      const data = await r.json()
      const projects = data.map((p: any) => ({
        id: String(p.id),
        companyName: p.title,
        description: p.description,
        createdAt: p.created_at,
        products: []
      }))
      res.status(200).json(projects)
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch projects' })
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body
      const r = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization || ''
        },
        body: JSON.stringify({
          title: body.companyName,
          description: body.description
        })
      })
      const data = await r.json()
      const project = {
        id: String(data.id),
        companyName: data.title,
        description: data.description,
        createdAt: data.created_at,
        products: []
      }
      res.status(201).json(project)
    } catch (e) {
      res.status(500).json({ error: 'Failed to create project' })
    }
  } else {
    res.status(405).end()
  }
}
