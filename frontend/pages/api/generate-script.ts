import type { NextApiRequest, NextApiResponse } from 'next'
import { ScriptOutput } from '../../lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse<ScriptOutput>) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const systemPrompt = process.env.SCRIPT_SYSTEM_PROMPT || ''
  const { business } = req.body

  // In real app combine systemPrompt with business and call LLM
  const mock: ScriptOutput = {
    storyboard: [
      { id: 'scene-1', title: 'Проблема клиента', description: 'Клиент в панике: не может понять, зачем ему продукт.', lipsync: false },
      { id: 'scene-2', title: 'Появляется объяснение', description: 'На экране — простая графика, рассказывающая суть.', lipsync: true, lipsyncText: 'Наш продукт помогает вам решить проблему — быстро и понятно.' }
    ],
    voiceoverText: 'Наш продукт помогает вам решить проблему быстро и понятно.',
    rationale: 'Сценарий отражает заявленные ценности и проблемы клиента.'
  }

  res.status(200).json(mock)
}
