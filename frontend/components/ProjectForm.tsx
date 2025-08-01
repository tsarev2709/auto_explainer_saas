import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  format: z.string().min(1, 'Обязательное поле'),
  target_audience: z.string().min(1, 'Обязательное поле'),
})

export type ProjectFormData = z.infer<typeof schema>

export default function ProjectForm({ onSave }: { onSave: (data: ProjectFormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div>
        <label className="block mb-1">Название проекта</label>
        <input className="w-full border rounded px-3 py-2" {...register('title')} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Формат</label>
        <input className="w-full border rounded px-3 py-2" {...register('format')} />
        {errors.format && <p className="text-red-500 text-sm">{errors.format.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Целевая аудитория</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('target_audience')} />
        {errors.target_audience && <p className="text-red-500 text-sm">{errors.target_audience.message}</p>}
      </div>
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  )
}
