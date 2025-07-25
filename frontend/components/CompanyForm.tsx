import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '../lib/store';

const schema = z.object({
  companyName: z.string().min(1, 'Обязательное поле'),
  sphere: z.string().optional(),
  description: z.string().optional(),
  niche: z.string().optional(),
  mission: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CompanyForm({ initial, onSave }: { initial?: Project; onSave: (data: FormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial ?? {}
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div>
        <label className="block mb-1">Название компании</label>
        <input className="w-full border rounded px-3 py-2" {...register('companyName')} />
        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Сфера деятельности</label>
        <input className="w-full border rounded px-3 py-2" {...register('sphere')} />
      </div>
      <div>
        <label className="block mb-1">Описание бизнеса</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('description')} />
      </div>
      <div>
        <label className="block mb-1">Ниша</label>
        <input className="w-full border rounded px-3 py-2" {...register('niche')} />
      </div>
      <div>
        <label className="block mb-1">Миссия</label>
        <textarea className="w-full border rounded px-3 py-2" {...register('mission')} />
      </div>
      <button type="submit" className="bg-brandTurquoise text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  );
}
