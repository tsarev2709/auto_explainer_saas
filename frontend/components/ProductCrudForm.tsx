import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  type: z.enum(['script', 'frame', 'video', 'voice', 'music']),
  description: z.string().optional(),
  status: z.enum(['draft', 'in_progress', 'done'])
})

export type ProductData = z.infer<typeof schema>

interface Props {
  initial?: Partial<ProductData>
  onSave: (data: ProductData) => void
  isPro?: boolean
}

export default function ProductCrudForm({ initial, onSave, isPro }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductData>({
    resolver: zodResolver(schema),
    defaultValues: initial as any
  })

  const startRecognition = (field: keyof ProductData) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return
    const rec = new SpeechRecognition()
    rec.lang = 'ru-RU'
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(' ')
      setValue(field, text as any)
    }
    rec.start()
  }

  const Mic = (field: keyof ProductData) => (
    isPro ? (
      <button type="button" aria-label="voice-input" onClick={() => startRecognition(field)} className="ml-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
          <path fill-rule="evenodd" d="M5 10a5 5 0 0010 0h2a7 7 0 01-14 0h2z" clip-rule="evenodd" />
          <path d="M11 18h-2v-2h2v2z" />
        </svg>
      </button>
    ) : null
  )

  const renderInput = (field: keyof ProductData, label: string) => (
    <div>
      <label htmlFor={field} className="block mb-1">{label}</label>
      <div className="flex items-center">
        <input id={field} aria-label={label} className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
      {(errors as any)[field] && <p className="text-red-500 text-sm">{(errors as any)[field].message}</p>}
    </div>
  )

  const renderArea = (field: keyof ProductData, label: string) => (
    <div>
      <label htmlFor={field} className="block mb-1">{label}</label>
      <div className="flex items-start">
        <textarea id={field} aria-label={label} className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
    </div>
  )

  const renderSelect = (field: keyof ProductData, label: string, options: string[]) => (
    <div>
      <label htmlFor={field} className="block mb-1">{label}</label>
      <div className="flex items-center">
        <select id={field} aria-label={label} className="w-full border rounded px-3 py-2" {...register(field)}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {Mic(field)}
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      {renderInput('title', 'Название')}
      {renderSelect('type', 'Тип', ['script', 'frame', 'video', 'voice', 'music'])}
      {renderArea('description', 'Описание')}
      {renderSelect('status', 'Статус', ['draft', 'in_progress', 'done'])}
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  )
}
