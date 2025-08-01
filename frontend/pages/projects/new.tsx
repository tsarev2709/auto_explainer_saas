import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ProjectForm, { ProjectFormData } from '../../components/ProjectForm';

export default function NewProjectPage() {
  const router = useRouter();
  const isPro = typeof window !== 'undefined' && localStorage.getItem('mode') === 'pro';

  const handleCreate = async (data: ProjectFormData) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success('Проект создан');
      router.push('/projects');
    } else {
      toast.error('Ошибка при создании');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Новый проект</h1>
      <ProjectForm onSave={handleCreate} isPro={isPro} />
    </div>
  );
}
