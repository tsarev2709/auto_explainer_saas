import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().optional(),
  format: z.enum(['16:9', '9:16', '1:1']),
  target_audience: z.string().optional(),
  goals: z.string().optional(),
  tone: z.enum(['Информативный', 'Эмоциональный', 'Провокационный']),
  style: z.enum(['2D', '3D', 'Screencast', 'Hand-drawn'])
});

export type ProjectFormData = z.infer<typeof schema>;

interface Props {
  initial?: Partial<ProjectFormData>;
  isPro?: boolean;
  onSave: (data: ProjectFormData) => void;
}

export default function ProjectVideoForm({ initial, onSave, isPro }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: initial as any
  });

  const startRecognition = (field: keyof ProjectFormData) => {
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

  const Mic = (field: keyof ProjectFormData) => (
    isPro ? (
      <button type="button" onClick={() => startRecognition(field)} className="ml-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
          <path fillRule="evenodd" d="M5 10a5 5 0 0010 0h2a7 7 0 01-14 0h2z" clipRule="evenodd" />
          <path d="M11 18h-2v-2h2v2z" />
        </svg>
      </button>
    ) : null
  );

  const renderInput = (field: keyof ProjectFormData, label: string) => (
    <div>
      <label className="block mb-1">{label}</label>
      <div className="flex items-center">
        <input className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
      {(errors as any)[field] && <p className="text-red-500 text-sm">{(errors as any)[field].message}</p>}
    </div>
  );

  const renderArea = (field: keyof ProjectFormData, label: string) => (
    <div>
      <label className="block mb-1">{label}</label>
      <div className="flex items-start">
        <textarea className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
    </div>
  );

  const renderSelect = (field: keyof ProjectFormData, label: string, options: string[]) => (
    <div>
      <label className="block mb-1">{label}</label>
      <div className="flex items-center">
        <select className="w-full border rounded px-3 py-2" {...register(field)}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {Mic(field)}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      {renderInput('title', 'Название проекта')}
      {renderArea('description', 'Описание')}
      {renderSelect('format', 'Формат', ['16:9', '9:16', '1:1'])}
      {renderArea('target_audience', 'Целевая аудитория')}
      {renderArea('goals', 'Цель видео')}
      {renderSelect('tone', 'Тональность', ['Информативный', 'Эмоциональный', 'Провокационный'])}
      {renderSelect('style', 'Визуальный стиль', ['2D', '3D', 'Screencast', 'Hand-drawn'])}
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  );
}
