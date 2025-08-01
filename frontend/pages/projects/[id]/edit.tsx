import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProjectForm, { ProjectFormData } from '../../../components/ProjectForm';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [initial, setInitial] = useState<ProjectFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const isPro = typeof window !== 'undefined' && localStorage.getItem('mode') === 'pro';

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setInitial(data);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (values: ProjectFormData) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast.success('Сохранено');
      router.push('/projects');
    } else {
      toast.error('Ошибка при сохранении');
    }
  };

  if (loading) return <p className="p-6">Загрузка...</p>;
  if (!initial) return <p className="p-6">Проект не найден</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Редактировать проект</h1>
      <ProjectForm onSave={handleSave} initial={initial} isPro={isPro} />
    </div>
  );
}
