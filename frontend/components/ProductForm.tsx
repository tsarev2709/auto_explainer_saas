import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '../lib/store';

const schema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  description: z.string().min(1),
  targetAudience: z.string().min(1),
  customerValues: z.string().min(1),
  problem: z.string().min(1),
  useCase: z.string().min(1),
  funnelDescription: z.string().min(1),
  productGoal: z.string().min(1)
});

type FormData = z.infer<typeof schema>;

export default function ProductForm({ initial, onSave }: { initial?: Product; onSave: (values: FormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? { ...initial, customerValues: initial.customerValues.join(', ') }
      : {}
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div>
        <label className="block mb-1">Название продукта</label>
        <input className="w-full border rounded px-3 py-2" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Описание</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('description')} />
      </div>
      <div>
        <label className="block mb-1">Целевая аудитория</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('targetAudience')} />
      </div>
      <div>
        <label className="block mb-1">Ключевые клиентские ценности</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('customerValues')} />
      </div>
      <div>
        <label className="block mb-1">Проблема</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('problem')} />
      </div>
      <div>
        <label className="block mb-1">Сценарий использования</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('useCase')} />
      </div>
      <div>
        <label className="block mb-1">Воронка продаж</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('funnelDescription')} />
      </div>
      <div>
        <label className="block mb-1">Цель продукта</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('productGoal')} />
      </div>
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  );
}
