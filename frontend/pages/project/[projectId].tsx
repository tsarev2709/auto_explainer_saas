import { useRouter } from 'next/router';
import { useStore, Project } from '../../lib/store';
import CompanyForm from '../../components/CompanyForm';
import ProductCard from '../../components/ProductCard';
import ProductForm from '../../components/ProductForm';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const project = useStore(s => s.projects.find(p => p.id === id));
  const updateProject = useStore(s => s.updateProject);
  const addProduct = useStore(s => s.addProduct);
  const [open, setOpen] = useState(false);

  if (!project) return <p className="p-6">Проект не найден</p>;

  const handleSaveCompany = (data: any) => {
    updateProject({ ...project, ...data });
    toast.success('Сохранено');
  };

  const handleCreateProduct = (data: any) => {
    addProduct(project.id, {
      id: uuid(),
      name: data.name,
      description: data.description,
      targetAudience: data.targetAudience,
      customerValues: data.customerValues.split(',').map((s: string) => s.trim()),
      problem: data.problem,
      useCase: data.useCase,
      funnelDescription: data.funnelDescription,
      productGoal: data.productGoal,
      roadmap: [
        { id: '1', title: 'Бизнес-анализ', status: 'done' },
        { id: '2', title: 'Написание сценария', status: 'not_started' },
        { id: '3', title: 'Выбор визуального стиля', status: 'not_started' },
        { id: '4', title: 'Генерация ключевых кадров', status: 'not_started' },
        { id: '5', title: 'Анимация', status: 'not_started' },
        { id: '6', title: 'Монтаж и озвучка', status: 'not_started' },
        { id: '7', title: 'Экспорт финального видео', status: 'not_started' },
      ]
    });
    setOpen(false);
    toast.success('Продукт добавлен');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">{project.companyName}</h1>
      <CompanyForm initial={project} onSave={handleSaveCompany} />

      <div className="flex items-center justify-between mt-8">
        <h2 className="text-xl font-semibold">Продукты</h2>
        <button onClick={() => setOpen(true)} className="bg-brandTurquoise text-white px-4 py-2 rounded">
          Добавить продукт
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {project.products.map(pr => (
          <ProductCard key={pr.id} projectId={project.id} product={pr} />
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">Новый продукт</Dialog.Title>
            <ProductForm onSave={handleCreateProduct} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
