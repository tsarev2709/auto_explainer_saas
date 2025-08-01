import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import ProjectVideoForm, {
  ProjectFormData,
} from '../../../components/ProjectVideoForm';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: session } = useSession();
  const isPro = (session as any)?.user?.mode === 'pro';
  const [initial, setInitial] = useState<ProjectFormData | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setInitial(data);
      });
  }, [id]);

  const handleSave = async (data: ProjectFormData) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success('Проект обновлён');
      router.push('/projects');
    } else {
      toast.error('Ошибка при сохранении');
    }
  };

  if (!initial) return <p className="p-6">Загрузка...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Редактирование проекта</h1>
      <ProjectVideoForm initial={initial} onSave={handleSave} isPro={isPro} />
    </div>
  );
}
