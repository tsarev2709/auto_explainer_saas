import { useState, useEffect } from 'react'
import { Scene, GeneratedImage } from '../lib/store'
import SceneFrameCard from './SceneFrameCard'
import FooterProgress from './FooterProgress'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface Style { id: string; url: string }

interface Props {
  projectId: string
  productId: string
  scenes: Scene[]
  initialFrames?: Record<string, GeneratedImage>
  onSave: (frames: Record<string, GeneratedImage>) => void
}

export default function FrameGenerationPanel({ projectId, productId, scenes, initialFrames, onSave }: Props) {
  const router = useRouter()
  const [prompts, setPrompts] = useState<Record<string, string>>(() => {
    const obj: Record<string, string> = {}
    scenes.forEach(sc => {
      obj[sc.id] = sc.description
    })
    return obj
  })
  const [formats, setFormats] = useState<Record<string, '16:9' | '9:16'>>(() => {
    const obj: Record<string, '16:9' | '9:16'> = {}
    scenes.forEach(sc => {
      obj[sc.id] = '16:9'
    })
    return obj
  })
  const [images, setImages] = useState<Record<string, GeneratedImage[]>>({})
  const [selected, setSelected] = useState<Record<string, GeneratedImage>>(initialFrames || {})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [styles, setStyles] = useState<Style[]>([])
  const [styleId, setStyleId] = useState<string>()

  useEffect(() => {
    fetch('/api/styles')
      .then(res => res.json())
      .then(setStyles)
  }, [])

  const generate = async (sceneId: string) => {
    setLoading(l => ({ ...l, [sceneId]: true }))
    const toastId = toast.loading('Генерация изображения...')
    try {
      const res = await fetch('/api/generate-frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sceneId,
          prompt: prompts[sceneId],
          format: formats[sceneId],
          styleId
        })
      })
      if (!res.ok) throw new Error(await res.text())
      const data: GeneratedImage[] = await res.json()
      setImages(i => ({ ...i, [sceneId]: data }))
      toast.success('Изображение сгенерировано', { id: toastId })
    } catch (err) {
      console.error(err)
      toast.error('Ошибка генерации изображения', { id: toastId })
    } finally {
      setLoading(l => ({ ...l, [sceneId]: false }))
    }
  }

  const select = (sceneId: string, img: GeneratedImage) => {
    const next = { ...selected, [sceneId]: img }
    setSelected(next)
    onSave(next)
  }

  const allSelected = scenes.every(sc => selected[sc.id])

  const goNext = () => {
    router.push(`/project/${projectId}/product/${productId}/animation`)
  }

  return (
    <div className="space-y-6 pb-24">
      {scenes.map(sc => (
        <SceneFrameCard
          key={sc.id}
          scene={sc}
          prompt={prompts[sc.id]}
          format={formats[sc.id]}
          styles={styles}
          selectedStyle={styleId}
          images={images[sc.id]}
          generating={loading[sc.id]}
          selectedImage={selected[sc.id]}
          onPromptChange={val => setPrompts(p => ({ ...p, [sc.id]: val }))}
          onFormatChange={val => setFormats(f => ({ ...f, [sc.id]: val }))}
          onStyleSelect={setStyleId}
          onGenerate={() => generate(sc.id)}
          onSelectImage={img => select(sc.id, img)}
        />
      ))}
      <FooterProgress selected={Object.keys(selected).length} total={scenes.length} disabled={!allSelected} onNext={goNext} />
    </div>
  )
}

