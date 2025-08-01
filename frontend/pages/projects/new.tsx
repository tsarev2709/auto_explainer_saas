import { useState } from 'react'
import { useRouter } from 'next/router'
import ProjectForm, { ProjectFormData } from '../../components/ProjectForm'

export default function NewProjectPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSave = async (data: ProjectFormData) => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
      return
    }
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...data, status: 'draft' })
      })
      if (res.status === 401) {
        router.replace('/login')
        return
      }
      if (!res.ok) throw new Error()
      const project = await res.json()
      router.push(`/projects/${project.id}/edit`)
    } catch (e) {
      setError('Ошибка при создании проекта')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Новый проект</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ProjectForm onSave={handleSave} />
    </div>
  )
}
