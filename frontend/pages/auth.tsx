import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

type FormData = z.infer<typeof schema>;

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (session) router.replace('/dashboard');
  }, [session, router]);

  const onSubmit = async (data: FormData) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    });
    if (res?.ok) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Вход</h1>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" {...register('email')} className="w-full border rounded px-3 py-2" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Пароль</label>
          <input type="password" {...register('password')} className="w-full border rounded px-3 py-2" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-brandTurquoise text-white py-2 rounded-md hover:bg-brandViolet transition">Войти</button>
      </form>
    </div>
  );
}
