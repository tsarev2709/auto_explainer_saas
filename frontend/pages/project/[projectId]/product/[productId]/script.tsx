import { useRouter } from 'next/router'
import { useStore, ScriptOutput } from '../../../../../lib/store'
import { useState } from 'react'
import ScriptEditor from '../../../../../components/ScriptEditor'
import ProgressBar from '../../../../../components/ProgressBar'
import toast from 'react-hot-toast'

export default function ScriptPage() {
  const router = useRouter()
  const { projectId, productId } = router.query as { projectId: string; productId: string }
  const project = useStore(s => s.projects.find(p => p.id === projectId))
  const updateProduct = useStore(s => s.updateProduct)

  if (!project) return <p className="p-6">Проект не найден</p>
  const product = project.products.find(p => p.id === productId)
  if (!product) return <p className="p-6">Продукт не найден</p>

  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    const toastId = toast.loading('Генерация сценария...')
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business: product })
      })
      if (!res.ok) throw new Error(await res.text())
      const data: ScriptOutput = await res.json()
      updateProduct(project.id, { ...product, script: data })
      toast.success('Сценарий сгенерирован', { id: toastId })
    } catch (err) {
      console.error(err)
      toast.error('Ошибка генерации сценария', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = (script: ScriptOutput) => {
    updateProduct(project.id, { ...product, script })
  }

  return (
    <div className="p-6 space-y-4">
      <ProgressBar current={1} />
      <h1 className="text-2xl font-bold mb-4">Сценарий для {product.name}</h1>
      {!product.script && (
        <button onClick={handleGenerate} disabled={loading} className="bg-brandTurquoise text-white px-4 py-2 rounded">
          {loading ? 'Генерация...' : 'Сгенерировать сценарий'}
        </button>
      )}
      {product.script && (
        <div className="space-y-4">
          <ScriptEditor initial={product.script} onChange={handleSave} />
          <div className="flex space-x-2">
            <button onClick={handleGenerate} disabled={loading} className="bg-brandPink text-white px-4 py-2 rounded">
              {loading ? 'Генерация...' : 'Перегенерировать'}
            </button>
            <button onClick={() => router.push(`/project/${project.id}/product/${product.id}/frames`)} className="bg-brandTurquoise text-white px-4 py-2 rounded">
              Перейти к ключевым кадрам
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
