import { useRouter } from 'next/router';
import { useStore } from '../../../../../lib/store';
import ProductForm from '../../../../../components/ProductForm';
import RoadmapStepView from '../../../../../components/RoadmapStep';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const router = useRouter();
  const { projectId, productId } = router.query as { projectId: string; productId: string };
  const project = useStore(s => s.projects.find(p => p.id === projectId));
  const updateProduct = useStore(s => s.updateProduct);

  if (!project) return <p className="p-6">Проект не найден</p>;
  const product = project.products.find(p => p.id === productId);
  if (!product) return <p className="p-6">Продукт не найден</p>;

  const handleSave = (data: any) => {
    updateProduct(project.id, { ...product, ...data });
    toast.success('Сохранено');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <ProductForm initial={product} onSave={handleSave} />

      <h2 className="text-xl font-semibold mt-6">Дорожная карта</h2>
      <div className="space-y-2">
        {product.roadmap.map(step => (
          <RoadmapStepView key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}
