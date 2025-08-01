import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProjectCard from './ProjectCard'
import CompanyForm from './CompanyForm'
import { Dialog } from '@headlessui/react'
import { Project } from '../lib/store'
import toast from 'react-hot-toast'

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleCreate = async (data: any) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      const project = await res.json()
      toast.success('Проект создан')
      router.push(`/projects/${project.id}`)
    } else {
      toast.error('Ошибка при создании')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои проекты</h1>
        <button onClick={() => setOpen(true)} className="bg-brandTurquoise text-white px-4 py-2 rounded">
          Создать проект
        </button>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">Новый проект</Dialog.Title>
            <CompanyForm onSave={handleCreate} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
