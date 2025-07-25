import { useRouter } from 'next/router'
import { useStore, GeneratedImage } from '../../../../../lib/store'
import ProgressBar from '../../../../../components/ProgressBar'
import FrameGenerationPanel from '../../../../../components/FrameGenerationPanel'

export default function FramesPage() {
  const router = useRouter()
  const { projectId, productId } = router.query as { projectId: string; productId: string }
  const project = useStore(s => s.projects.find(p => p.id === projectId))
  const updateProduct = useStore(s => s.updateProduct)

  if (!project) return <p className="p-6">Проект не найден</p>
  const product = project.products.find(p => p.id === productId)
  if (!product) return <p className="p-6">Продукт не найден</p>

  const handleSave = (frames: Record<string, GeneratedImage>) => {
    updateProduct(project.id, { ...product, frames })
  }

  return (
    <div className="p-6 space-y-4">
      <ProgressBar current={3} />
      <h1 className="text-2xl font-bold mb-4">Ключевые кадры для {product.name}</h1>
      {product.script && (
        <FrameGenerationPanel
          projectId={project.id}
          productId={product.id}
          scenes={product.script.storyboard}
          initialFrames={product.frames}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

