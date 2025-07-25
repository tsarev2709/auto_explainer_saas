import { GeneratedVideo } from '../lib/store'

interface Props {
  video: GeneratedVideo
  selected?: boolean
  onSelect: () => void
  onDelete: () => void
}

export default function VideoPreview({ video, selected, onSelect, onDelete }: Props) {
  return (
    <div className={`border rounded p-2 space-y-2 ${selected ? 'border-brandViolet' : 'border-transparent'}`}> 
      <video src={video.url} controls className="w-full h-40 object-cover" />
      <div className="flex space-x-2">
        <button onClick={onSelect} className="bg-brandTurquoise text-white px-2 py-1 rounded">Выбрать</button>
        <button onClick={onDelete} className="bg-brandPink text-white px-2 py-1 rounded">Удалить</button>
      </div>
    </div>
  )
}
