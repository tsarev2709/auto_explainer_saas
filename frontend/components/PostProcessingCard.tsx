import { useState } from 'react'
import QualityIndicator from './QualityIndicator'
import ArtifactOverlay from './ArtifactOverlay'

export interface VideoScene {
  id: string
  videoUrl: string
  keyframeUrl: string
  generator: string
  duration: number
}

interface Props {
  scene: VideoScene
  onDone: (id: string) => void
}

interface QualityResult {
  artifactFrames: number[]
  type: 'blur' | 'warp' | 'noise' | 'blackframe'
  qualityScore: number
}

export default function PostProcessingCard({ scene, onDone }: Props) {
  const [quality, setQuality] = useState<QualityResult>()
  const [to4k, setTo4k] = useState(true)
  const [to60, setTo60] = useState(true)
  const [status, setStatus] = useState<'pending' | 'done'>('pending')

  const analyze = async () => {
    const res = await fetch('/api/analyze-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sceneId: scene.id, videoUrl: scene.videoUrl })
    })
    const data: QualityResult = await res.json()
    setQuality(data)
  }

  const remove = async () => {
    if (!quality) return
    await fetch('/api/remove-artifacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sceneId: scene.id, artifactFrames: quality.artifactFrames })
    })
  }

  const finalize = async () => {
    await fetch('/api/upscale-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sceneId: scene.id, to4k, to60fps: to60 })
    })
    setStatus('done')
    onDone(scene.id)
  }

  if (status === 'done') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
        <p className="font-semibold">{scene.id} ✅ Обработано</p>
      </div>
    )
  }

  const totalFrames = Math.round(scene.duration * 30)

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
      <video src={scene.videoUrl} controls className="w-full h-40 object-cover" />
      {quality && <QualityIndicator score={quality.qualityScore} />}
      {quality && quality.artifactFrames.length > 0 && (
        <ArtifactOverlay frames={quality.artifactFrames} totalFrames={totalFrames} />
      )}
      <div className="flex space-x-2">
        <button onClick={analyze} className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded">
          Анализировать качество
        </button>
        {quality && quality.artifactFrames.length > 0 && (
          <button onClick={remove} className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded">
            Удалить артефакты
          </button>
        )}
      </div>
      <label className="flex items-center space-x-2 text-sm">
        <input type="checkbox" checked={to4k} onChange={e => setTo4k(e.target.checked)} />
        <span>Апскейлить до 4K</span>
      </label>
      <label className="flex items-center space-x-2 text-sm">
        <input type="checkbox" checked={to60} onChange={e => setTo60(e.target.checked)} />
        <span>Повысить FPS до 60</span>
      </label>
      <button onClick={finalize} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded">
        Готово
      </button>
    </div>
  )
}
