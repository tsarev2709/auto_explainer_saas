import { Scene } from '../lib/store'

interface Props {
  scene: Scene
  onChange: (scene: Scene) => void
}

export default function SceneCard({ scene, onChange }: Props) {
  return (
    <div className="border rounded p-3 space-y-2">
      <input
        className="w-full border rounded px-2 py-1"
        value={scene.title}
        onChange={e => onChange({ ...scene, title: e.target.value })}
      />
      <textarea
        className="w-full border rounded px-2 py-1"
        value={scene.description}
        onChange={e => onChange({ ...scene, description: e.target.value })}
      />
      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          checked={scene.lipsync}
          onChange={e => onChange({ ...scene, lipsync: e.target.checked })}
        />
        <span>Нужен липсинг?</span>
      </label>
      {scene.lipsync && (
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Текст для губ"
          value={scene.lipsyncText || ''}
          onChange={e => onChange({ ...scene, lipsyncText: e.target.value })}
        />
      )}
    </div>
  )
}
