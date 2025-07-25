import { useState } from 'react'
import { Scene, GeneratedImage, GeneratedVideo } from '../lib/store'
import SceneAnimationCard from './SceneAnimationCard'
import ProgressFooter from './ProgressFooter'
import SettingsPanel from './SettingsPanel'
import { useRouter } from 'next/router'

interface Props {
  projectId: string
  productId: string
  scenes: Scene[]
  keyframes: Record<string, GeneratedImage>
  initialVideos?: Record<string, GeneratedVideo>
  onSave: (videos: Record<string, GeneratedVideo>) => void
}

export default function AnimationPanel({ projectId, productId, scenes, keyframes, initialVideos, onSave }: Props) {
  const router = useRouter()
  const [durations, setDurations] = useState<Record<string, number>>(() => {
    const obj: Record<string, number> = {}
    scenes.forEach(sc => { obj[sc.id] = 5 })
    return obj
  })
  const [generators, setGenerators] = useState<Record<string, string>>(() => {
    const obj: Record<string, string> = {}
    scenes.forEach(sc => { obj[sc.id] = 'kling' })
    return obj
  })
  const [videos, setVideos] = useState<Record<string, GeneratedVideo[]>>({})
  const [selected, setSelected] = useState<Record<string, GeneratedVideo>>(initialVideos || {})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({ kling: '', 'wav2.1': '' })

  const generate = async (sceneId: string) => {
    setLoading(l => ({ ...l, [sceneId]: true }))
    const res = await fetch('/api/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sceneId,
        generator: generators[sceneId],
        duration: durations[sceneId],
        imageUrl: keyframes[sceneId]?.url,
        lipsyncText: scenes.find(sc => sc.id === sceneId)?.lipsyncText,
        apiKey: apiKeys[generators[sceneId]]
      })
    })
    const data: GeneratedVideo = await res.json()
    setVideos(v => ({ ...v, [sceneId]: [...(v[sceneId] || []), data] }))
    setLoading(l => ({ ...l, [sceneId]: false }))
  }

  const select = (sceneId: string, video: GeneratedVideo) => {
    const next = { ...selected, [sceneId]: video }
    setSelected(next)
    onSave(next)
  }

  const remove = (sceneId: string, videoId: string) => {
    setVideos(v => ({ ...v, [sceneId]: (v[sceneId] || []).filter(vv => vv.id !== videoId) }))
    if (selected[sceneId]?.id === videoId) {
      const next = { ...selected }
      delete next[sceneId]
      setSelected(next)
      onSave(next)
    }
  }

  const allSelected = scenes.every(sc => selected[sc.id])

  const goNext = () => {
    router.push(`/project/${projectId}/product/${productId}/post`)
  }

  return (
    <div className="space-y-6 pb-24">
      <SettingsPanel apiKeys={apiKeys} onChange={setApiKeys} />
      {scenes.map(sc => (
        <SceneAnimationCard
          key={sc.id}
          scene={sc}
          keyframe={keyframes[sc.id]}
          duration={durations[sc.id]}
          generator={generators[sc.id]}
          videos={videos[sc.id]}
          generating={loading[sc.id]}
          selected={selected[sc.id]}
          onDurationChange={val => setDurations(d => ({ ...d, [sc.id]: val }))}
          onGeneratorChange={val => setGenerators(g => ({ ...g, [sc.id]: val }))}
          onGenerate={() => generate(sc.id)}
          onSelectVideo={vid => select(sc.id, vid)}
          onDeleteVideo={id => remove(sc.id, id)}
        />
      ))}
      <ProgressFooter selected={Object.keys(selected).length} total={scenes.length} disabled={!allSelected} onNext={goNext} />
    </div>
  )
}
