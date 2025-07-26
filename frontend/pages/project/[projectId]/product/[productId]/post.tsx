import { useRouter } from 'next/router'
import { useStore } from '../../../../../lib/store'
import ProgressBar from '../../../../../components/ProgressBar'
import PostProcessingPanel from '../../../../../components/PostProcessingPanel'

export default function PostPage() {
  const router = useRouter()
  const { projectId, productId } = router.query as { projectId: string; productId: string }
  const project = useStore(s => s.projects.find(p => p.id === projectId))

  if (!project) return <p className="p-6">Проект не найден</p>
  const product = project.products.find(p => p.id === productId)
  if (!product) return <p className="p-6">Продукт не найден</p>

  const scenes = (product.script?.storyboard || []).map(sc => {
    const vid = product.videos?.[sc.id]
    const img = product.frames?.[sc.id]
    if (!vid) return null
    return {
      id: sc.id,
      videoUrl: vid.url,
      keyframeUrl: img?.url || '',
      generator: vid.generator,
      duration: vid.duration
    }
  }).filter(Boolean) as any[]

  return (
    <div className="p-6 space-y-4">
      <ProgressBar current={5} />
      <h1 className="text-2xl font-bold mb-4">Постобработка для {product.name}</h1>
      <PostProcessingPanel projectId={project.id} productId={product.id} scenes={scenes} />
    </div>
  )
}

