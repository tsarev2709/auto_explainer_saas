import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1, 'Обязательное поле'),
  target_audience: z.string().min(1, 'Обязательное поле'),
  format: z.enum(['16:9', '9:16']),
  tone: z.string().min(1, 'Обязательное поле'),
  style: z.string().min(1, 'Обязательное поле'),
  goals: z.string().min(1, 'Обязательное поле')
});

export type FormData = z.infer<typeof schema>;

interface Props {
  initial?: FormData;
  isPro?: boolean;
  onSubmit: (data: FormData) => void;
}

export default function ProjectForm({ initial, isPro, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial
  });

  const startRecognition = (field: keyof FormData) => {
    const win = window as unknown as {
      SpeechRecognition?: typeof SpeechRecognition;
      webkitSpeechRecognition?: typeof SpeechRecognition;
    };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec: SpeechRecognition = new SpeechRecognition();
    rec.lang = 'ru-RU';
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const text = Array.from(e.results)
        .map((r: SpeechRecognitionResult) => r[0].transcript)
        .join(' ');
      setValue(field, text);
    };
    rec.start();
  };

  const Mic = (field: keyof FormData) =>
    isPro ? (
      <button
        type="button"
        aria-label="voice input"
        onClick={() => startRecognition(field)}
        className="ml-2 text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
          <path
            fillRule="evenodd"
            d="M5 10a5 5 0 0010 0h2a7 7 0 01-14 0h2z"
            clipRule="evenodd"
          />
          <path d="M11 18h-2v-2h2v2z" />
        </svg>
      </button>
    ) : null;

  const renderInput = (field: keyof FormData, label: string) => (
    <div>
      <label htmlFor={field} className="block mb-1">
        {label}
      </label>
      <div className="flex items-center">
        <input id={field} className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm">{errors[field]?.message}</p>
      )}
    </div>
  );

  const renderArea = (field: keyof FormData, label: string) => (
    <div>
      <label htmlFor={field} className="block mb-1">
        {label}
      </label>
      <div className="flex items-start">
        <textarea id={field} className="w-full border rounded px-3 py-2" {...register(field)} />
        {Mic(field)}
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm">{errors[field]?.message}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {renderInput('title', 'Название')}
      {renderArea('description', 'Описание')}
      {renderInput('target_audience', 'Целевая аудитория')}
      <div>
        <label htmlFor="format" className="block mb-1">
          Формат
        </label>
        <select id="format" className="w-full border rounded px-3 py-2" {...register('format')}>
          <option value="16:9">16:9</option>
          <option value="9:16">9:16</option>
        </select>
      </div>
      {renderInput('tone', 'Тон')}
      {renderInput('style', 'Стиль')}
      {renderArea('goals', 'Цели')}
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">
        Сохранить
      </button>
    </form>
  );
}

