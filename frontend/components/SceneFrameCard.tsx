import { Scene, GeneratedImage } from '../lib/store'
import StyleGallery from './StyleGallery'
import ImageVariants from './ImageVariants'

interface Props {
  scene: Scene
  prompt: string
  format: '16:9' | '9:16'
  styles: { id: string; url: string }[]
  selectedStyle?: string
  images?: GeneratedImage[]
  generating?: boolean
  selectedImage?: GeneratedImage
  onPromptChange: (val: string) => void
  onFormatChange: (val: '16:9' | '9:16') => void
  onStyleSelect: (id: string) => void
  onGenerate: () => void
  onSelectImage: (img: GeneratedImage) => void
}

export default function SceneFrameCard({
  scene,
  prompt,
  format,
  styles,
  selectedStyle,
  images,
  generating,
  selectedImage,
  onPromptChange,
  onFormatChange,
  onStyleSelect,
  onGenerate,
  onSelectImage
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
      <h3 className="font-semibold">{scene.title}</h3>
      <p className="text-sm text-gray-500">{scene.description}</p>
      <textarea
        className="w-full border rounded px-2 py-1"
        value={prompt}
        onChange={e => onPromptChange(e.target.value)}
      />
      <select
        className="border rounded px-2 py-1"
        value={format}
        onChange={e => onFormatChange(e.target.value as '16:9' | '9:16')}
      >
        <option value="16:9">16:9</option>
        <option value="9:16">9:16</option>
      </select>
      <StyleGallery styles={styles} selected={selectedStyle} onSelect={onStyleSelect} />
      {images ? (
        <>
          <ImageVariants images={images} selected={selectedImage} onSelect={onSelectImage} />
          <button onClick={onGenerate} className="bg-brandPink text-white px-2 py-1 rounded">
            Сгенерировать заново
          </button>
        </>
      ) : (
        <button onClick={onGenerate} disabled={generating} className="bg-brandTurquoise text-white px-4 py-2 rounded">
          {generating ? 'Генерация...' : 'Сгенерировать изображение'}
        </button>
      )}
    </div>
  )
}

