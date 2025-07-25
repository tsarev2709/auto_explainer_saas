import { useRouter } from 'next/router'
import { useStore } from '../../../../../lib/store'
import ProgressBar from '../../../../../components/ProgressBar'

export default function FramesPage() {
  const router = useRouter()
  const { projectId, productId } = router.query as { projectId: string; productId: string }
  const project = useStore(s => s.projects.find(p => p.id === projectId))
  if (!project) return <p className="p-6">Проект не найден</p>
  const product = project.products.find(p => p.id === productId)
  if (!product) return <p className="p-6">Продукт не найден</p>
  return (
    <div className="p-6 space-y-4">
      <ProgressBar current={3} />
      <h1 className="text-2xl font-bold mb-4">Ключевые кадры для {product.name}</h1>
      <p>Здесь будет генерация ключевых кадров.</p>
    </div>
  )
}
