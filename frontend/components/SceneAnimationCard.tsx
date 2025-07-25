import { Scene, GeneratedImage, GeneratedVideo } from '../lib/store'
import GeneratorSelect from './GeneratorSelect'
import VideoPreview from './VideoPreview'

interface Props {
  scene: Scene
  keyframe?: GeneratedImage
  duration: number
  generator: string
  videos?: GeneratedVideo[]
  generating?: boolean
  selected?: GeneratedVideo
  onDurationChange: (val: number) => void
  onGeneratorChange: (val: string) => void
  onGenerate: () => void
  onSelectVideo: (video: GeneratedVideo) => void
  onDeleteVideo: (id: string) => void
}

export default function SceneAnimationCard({
  scene,
  keyframe,
  duration,
  generator,
  videos,
  generating,
  selected,
  onDurationChange,
  onGeneratorChange,
  onGenerate,
  onSelectVideo,
  onDeleteVideo
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
      <h3 className="font-semibold">{scene.title}</h3>
      {keyframe && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={keyframe.url} alt="keyframe" className="w-full h-40 object-cover" />
      )}
      <input
        type="number"
        className="border rounded px-2 py-1 w-24"
        value={duration}
        onChange={e => onDurationChange(Number(e.target.value))}
      />
      <GeneratorSelect value={generator} onChange={onGeneratorChange} />
      {scene.lipsync && scene.lipsyncText && (
        <p className="text-sm italic">{scene.lipsyncText}</p>
      )}
      {videos && videos.length > 0 ? (
        <div className="space-y-2">
          {videos.map(v => (
            <VideoPreview
              key={v.id}
              video={v}
              selected={selected?.id === v.id}
              onSelect={() => onSelectVideo(v)}
              onDelete={() => onDeleteVideo(v.id)}
            />
          ))}
          <button onClick={onGenerate} className="bg-brandPink text-white px-2 py-1 rounded">
            Перегенерировать
          </button>
        </div>
      ) : (
        <button onClick={onGenerate} disabled={generating} className="bg-brandTurquoise text-white px-4 py-2 rounded">
          {generating ? 'Генерация...' : 'Сгенерировать видео'}
        </button>
      )}
    </div>
  )
}
