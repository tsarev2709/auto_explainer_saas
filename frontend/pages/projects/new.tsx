import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import ProjectVideoForm, { ProjectFormData } from '../../components/ProjectVideoForm';

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isPro = (session as any)?.user?.mode === 'pro';

  const handleSave = async (data: ProjectFormData) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, status: 'draft' }) // взято из версии Codex
    });
    if (res.ok) {
      const project = await res.json(); // чтобы получить ID проекта
      toast.success('Проект создан');
      router.push(`/projects/${project.id}/edit`); // редирект на edit
    } else {
      toast.error('Ошибка при сохранении');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Новый проект</h1>
      <ProjectVideoForm onSave={handleSave} isPro={isPro} />
    </div>
  );
}
