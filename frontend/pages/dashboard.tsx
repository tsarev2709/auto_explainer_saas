import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import CompanyForm from '../components/CompanyForm';
import { Dialog } from '@headlessui/react';
import { useStore } from '../lib/store';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const projects = useStore(s => s.projects);
  const fetchProjects = useStore(s => s.fetchProjects);
  const createProject = useStore(s => s.createProject);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth');
    if (status === 'authenticated') fetchProjects();
  }, [status, router, fetchProjects]);

  if (!session) return null;

  const handleCreate = async (data: any) => {
    try {
      await createProject(data);
      setOpen(false);
      toast.success('Проект создан');
    } catch (e) {
      toast.error('Ошибка при создании проекта');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Мои проекты</h1>
      <button onClick={() => setOpen(true)} className="bg-brandTurquoise text-white px-4 py-2 rounded">
        Создать новый проект
      </button>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">Новый проект</Dialog.Title>
            <CompanyForm onSave={handleCreate} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
