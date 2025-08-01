import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Project {
  id: number | string
  title: string
  format: string
  target_audience: string
  status: string
}

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
      return
    }
    fetch('/api/projects', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.status === 401) {
          router.replace('/login')
          return null
        }
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        if (data) setProjects(data)
      })
      .catch(() => setError('Не удалось загрузить проекты'))
      .finally(() => setLoading(false))
  }, [router])

  const handleCreate = () => router.push('/projects/new')

  if (loading) return <p className="p-6">Загрузка...</p>

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-2xl font-bold mb-2">Мои проекты</h1>
        <button onClick={handleCreate} className="bg-brandTurquoise text-white px-4 py-2 rounded">Создать новый проект</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {projects.length === 0 ? (
        <p>Нет проектов</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Название</th>
                <th className="px-4 py-2 text-left">Формат</th>
                <th className="px-4 py-2 text-left">Целевая аудитория</th>
                <th className="px-4 py-2 text-left">Статус</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">{p.format}</td>
                  <td className="px-4 py-2">{p.target_audience}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => router.push(`/projects/${p.id}/edit`)} className="text-brandTurquoise hover:underline">
                      Редактировать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
