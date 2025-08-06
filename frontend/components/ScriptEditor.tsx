import { ScriptOutput, Scene } from '../lib/store'
import SceneCard from './SceneCard'
import VoiceoverEditor from './VoiceoverEditor'
import RationaleBox from './RationaleBox'
import { useState } from 'react'

export default function ScriptEditor({ initial, onChange }: { initial?: ScriptOutput; onChange: (s: ScriptOutput) => void }) {
  const [data, setData] = useState<ScriptOutput>(
    initial || { storyboard: [], voiceoverText: '', rationale: '' }
  )
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const updateScene = (idx: number, scene: Scene) => {
    const storyboard = [...data.storyboard]
    storyboard[idx] = scene
    const newData = { ...data, storyboard }
    setData(newData)
    onChange(newData)
  }

  const generateAudio = async () => {
    const res = await fetch('/api/generate-voiceover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: data.voiceoverText })
    })
    if (res.ok) {
      const payload = await res.json()
      const bytes = atob(payload.audio)
      const arr = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
      const blob = new Blob([arr], { type: 'audio/mpeg' })
      setAudioUrl(URL.createObjectURL(blob))
    }
  }

  return (
    <div className="space-y-4">
      {data.storyboard.map((scene, idx) => (
        <SceneCard key={scene.id} scene={scene} onChange={sc => updateScene(idx, sc)} />
      ))}
      <VoiceoverEditor
        text={data.voiceoverText}
        onChange={val => {
          const newData = { ...data, voiceoverText: val }
          setData(newData)
          onChange(newData)
        }}
      />
      <button
        type="button"
        className="px-2 py-1 border rounded"
        onClick={generateAudio}
      >
        Сгенерировать аудио
      </button>
      {audioUrl && <audio controls src={audioUrl} className="w-full" />}
      <RationaleBox
        text={data.rationale}
        onChange={val => {
          const newData = { ...data, rationale: val }
          setData(newData)
          onChange(newData)
        }}
      />
    </div>
  )
}
