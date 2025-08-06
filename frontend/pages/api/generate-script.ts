import type { NextApiRequest, NextApiResponse } from 'next'
import { ScriptOutput } from '../../lib/store'

type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScriptOutput | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const systemPrompt = process.env.SCRIPT_SYSTEM_PROMPT || ''
  const apiKey = process.env.OPENAI_API_KEY
  const { business } = req.body

  if (!apiKey) {
    res.status(500).json({ error: 'Missing OPENAI_API_KEY' })
    return
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(business) }
        ],
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI error: ${await response.text()}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    const script: ScriptOutput = JSON.parse(content)
    res.status(200).json(script)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate script' })
  }
}
