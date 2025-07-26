import { useState } from 'react'
import PostProcessingCard, { VideoScene } from './PostProcessingCard'
import { useRouter } from 'next/router'

interface Props {
  projectId: string
  productId: string
  scenes: VideoScene[]
}

export default function PostProcessingPanel({ projectId, productId, scenes }: Props) {
  const router = useRouter()
  const [done, setDone] = useState<Record<string, boolean>>({})

  const markDone = (id: string) => setDone(d => ({ ...d, [id]: true }))
  const allDone = scenes.every(sc => done[sc.id])

  const goNext = () => {
    router.push(`/project/${projectId}/product/${productId}/montage`)
  }

  return (
    <div className="space-y-6 pb-24">
      {scenes.map(sc => (
        <PostProcessingCard key={sc.id} scene={sc} onDone={markDone} />
      ))}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner p-4 flex justify-between items-center">
        <span>Обработано {Object.keys(done).length} из {scenes.length} сцен</span>
        <button onClick={goNext} disabled={!allDone} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Перейти к монтажу
        </button>
      </div>
    </div>
  )
}
