import Link from 'next/link';
import { Product } from '../lib/store';

export default function ProductCard({ product, projectId }: { product: Product; projectId: string }) {
  return (
    <Link href={`/project/${projectId}/product/${product.id}`} className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <h4 className="font-medium mb-1">{product.name}</h4>
      <p className="text-sm text-gray-500">Статус: {product.roadmap.find(r => r.id === '2')?.status === 'done' ? 'завершено' : 'в процессе'}</p>
    </Link>
  );
}
