import { ScriptOutput, Scene } from '../lib/store'
import SceneCard from './SceneCard'
import VoiceoverEditor from './VoiceoverEditor'
import RationaleBox from './RationaleBox'
import { useState } from 'react'

export default function ScriptEditor({ initial, onChange }: { initial?: ScriptOutput; onChange: (s: ScriptOutput) => void }) {
  const [data, setData] = useState<ScriptOutput>(
    initial || { storyboard: [], voiceoverText: '', rationale: '' }
  )

  const updateScene = (idx: number, scene: Scene) => {
    const storyboard = [...data.storyboard]
    storyboard[idx] = scene
    const newData = { ...data, storyboard }
    setData(newData)
    onChange(newData)
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
