import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(1, 'Введите пароль')
});

export type SignInData = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: SignInData) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const { token } = await res.json();
      if (token) {
        localStorage.setItem('token', token);
        router.push('/dashboard');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <div>
        <label className="block mb-1">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Пароль</label>
        <input type="password" className="w-full border rounded px-3 py-2" {...register('password')} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full bg-brandTurquoise text-white py-2 rounded-md hover:bg-brandViolet transition">
        Войти
      </button>
    </form>
  );
}
