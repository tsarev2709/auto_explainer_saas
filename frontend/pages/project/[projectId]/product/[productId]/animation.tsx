import { useRouter } from 'next/router'
import { useStore, GeneratedVideo } from '../../../../../lib/store'
import AnimationPanel from '../../../../../components/AnimationPanel'
import ProgressBar from '../../../../../components/ProgressBar'

export default function AnimationPage() {
  const router = useRouter()
  const { projectId, productId } = router.query as { projectId: string; productId: string }
  const project = useStore(s => s.projects.find(p => p.id === projectId))
  const updateProduct = useStore(s => s.updateProduct)

  if (!project) return <p className="p-6">Проект не найден</p>
  const product = project.products.find(p => p.id === productId)
  if (!product) return <p className="p-6">Продукт не найден</p>

  const handleSave = (videos: Record<string, GeneratedVideo>) => {
    updateProduct(project.id, { ...product, videos })
  }

  return (
    <div className="p-6 space-y-4">
      <ProgressBar current={4} />
      <h1 className="text-2xl font-bold mb-4">Анимация для {product.name}</h1>
      {product.frames && product.script && (
        <AnimationPanel
          projectId={project.id}
          productId={product.id}
          scenes={product.script.storyboard}
          keyframes={product.frames}
          initialVideos={product.videos}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
