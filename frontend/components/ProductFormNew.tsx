import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1),
  target_audience: z.string().min(1),
  goals: z.string().min(1),
  tone: z.string().min(1),
  style: z.string().min(1),
  advantages: z.string().min(1),
  features: z.string().min(1),
  references: z.string().min(1)
});

export type FormData = z.infer<typeof schema>;

interface Props {
  projectId?: string;
  isPro?: boolean;
  onSave: (data: FormData) => void;
}

export default function ProductForm({ projectId, isPro, onSave }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (!projectId) return;
    fetch(`/api/products?project_id=${projectId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          (Object.keys(data) as (keyof FormData)[]).forEach(key => {
            setValue(key, data[key]);
          });
        }
      })
      .catch(() => {});
  }, [projectId, setValue]);

  const startRecognition = (field: keyof FormData) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = 'ru-RU';
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(' ');
      setValue(field, text);
    };
    rec.start();
  };

  const Mic = (field: keyof FormData) => (
    isPro ? (
      <button type="button" onClick={() => startRecognition(field)} className="ml-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
          <path fill-rule="evenodd" d="M5 10a5 5 0 0010 0h2a7 7 0 01-14 0h2z" clip-rule="evenodd" />
          <path d="M11 18h-2v-2h2v2z" />
        </svg>
      </button>
    ) : null
  );

  const renderInput = (field: keyof FormData, label: string) => (
    <div>
      <label className="block mb-1">{label}</label>
      <div className="flex items-center">
        <input className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
      {errors[field] && <p className="text-red-500 text-sm">{(errors as any)[field].message}</p>}
    </div>
  );

  const renderArea = (field: keyof FormData, label: string) => (
    <div>
      <label className="block mb-1">{label}</label>
      <div className="flex items-start">
        <textarea className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      {renderInput('title', 'Название продукта')}
      {renderArea('description', 'Описание')}
      {renderArea('target_audience', 'Целевая аудитория')}
      {renderArea('goals', 'Цели')}
      {renderArea('tone', 'Тон общения')}
      {renderArea('style', 'Стиль')}
      {renderArea('advantages', 'Преимущества')}
      {renderArea('features', 'Функции')}
      {renderArea('references', 'Референсы')}
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  );
}
