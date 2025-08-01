import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().optional(),
  format: z.enum(['16:9', '9:16', '1:1']).default('16:9'),
  target_audience: z.string().optional(),
  goals: z.string().optional(),
  tone: z.enum(['Информативный', 'Эмоциональный', 'Провокационный']).default('Информативный'),
  style: z.enum(['2D', '3D', 'Screencast', 'Hand-drawn']).default('2D'),
});

export type ProjectFormData = z.infer<typeof schema>;

interface Props {
  initial?: Partial<ProjectFormData>;
  isPro?: boolean;
  onSave: (data: ProjectFormData) => void;
}

export default function ProjectForm({ initial, isPro, onSave }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: initial ?? {},
  });

  useEffect(() => {
    if (!initial) return;
    (Object.keys(initial) as (keyof ProjectFormData)[]).forEach((key) => {
      if (initial[key]) setValue(key, initial[key] as any);
    });
  }, [initial, setValue]);

  const startRecognition = (field: keyof ProjectFormData) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = 'ru-RU';
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(' ');
      setValue(field, text as any);
    };
    rec.start();
  };

  const Mic = (field: keyof ProjectFormData) => (
    isPro ? (
      <button
        type="button"
        aria-label={`voice-${field}`}
        onClick={() => startRecognition(field)}
        className="ml-2 text-gray-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
          <path fillRule="evenodd" d="M5 10a5 5 0 0010 0h2a7 7 0 01-14 0h2z" clipRule="evenodd" />
          <path d="M11 18h-2v-2h2v2z" />
        </svg>
      </button>
    ) : null
  );

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-1">Название проекта</label>
        <div className="flex items-center">
          <input id="title" className="w-full border rounded px-3 py-2" {...register('title')} />
          {Mic('title')}
        </div>
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Описание</label>
        <div className="flex items-start">
          <textarea id="description" className="w-full border rounded px-3 py-2" {...register('description')} />
          {Mic('description')}
        </div>
      </div>
      <div>
        <label htmlFor="format" className="block mb-1">Формат</label>
        <div className="flex items-center">
          <select id="format" className="w-full border rounded px-3 py-2" {...register('format')}>
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
            <option value="1:1">1:1</option>
          </select>
          {Mic('format')}
        </div>
      </div>
      <div>
        <label htmlFor="target_audience" className="block mb-1">Целевая аудитория</label>
        <div className="flex items-start">
          <textarea id="target_audience" className="w-full border rounded px-3 py-2" {...register('target_audience')} />
          {Mic('target_audience')}
        </div>
      </div>
      <div>
        <label htmlFor="goals" className="block mb-1">Цели</label>
        <div className="flex items-start">
          <textarea id="goals" className="w-full border rounded px-3 py-2" {...register('goals')} />
          {Mic('goals')}
        </div>
      </div>
      <div>
        <label htmlFor="tone" className="block mb-1">Тон</label>
        <div className="flex items-center">
          <select id="tone" className="w-full border rounded px-3 py-2" {...register('tone')}>
            <option value="Информативный">Информативный</option>
            <option value="Эмоциональный">Эмоциональный</option>
            <option value="Провокационный">Провокационный</option>
          </select>
          {Mic('tone')}
        </div>
      </div>
      <div>
        <label htmlFor="style" className="block mb-1">Стиль</label>
        <div className="flex items-center">
          <select id="style" className="w-full border rounded px-3 py-2" {...register('style')}>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="Screencast">Screencast</option>
            <option value="Hand-drawn">Hand-drawn</option>
          </select>
          {Mic('style')}
        </div>
      </div>
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  );
}
