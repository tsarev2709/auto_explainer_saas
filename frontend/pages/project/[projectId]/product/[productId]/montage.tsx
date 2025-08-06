import { useRouter } from 'next/router';
import { useState } from 'react';
import ProgressBar from '../../../../../components/ProgressBar';
import { useStore, GeneratedVideo } from '../../../../../lib/store';

export default function MontagePage() {
  const router = useRouter();
  const { projectId, productId } = router.query as { projectId: string; productId: string };
  const project = useStore(s => s.projects.find(p => p.id === projectId));
  const updateProduct = useStore(s => s.updateProduct);
  const [assembling, setAssembling] = useState(false);

  if (!project) return <p className="p-6">Проект не найден</p>;
  const product = project.products.find(p => p.id === productId);
  if (!product) return <p className="p-6">Продукт не найден</p>;

  const scenes: GeneratedVideo[] = Object.values(product.videos || {});
  const [finalUrl, setFinalUrl] = useState(product.finalVideoUrl || '');

  const assemble = async () => {
    setAssembling(true);
    const res = await fetch('/api/assemble-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenes: scenes.map(s => ({ url: s.url })),
        voiceover: product.script?.voiceoverText,
      }),
    });
    const data = await res.json();
    setFinalUrl(data.url);
    updateProduct(project.id, {
      ...product,
      finalVideoUrl: data.url,
      roadmap: product.roadmap.map(r =>
        r.id === '6' ? { ...r, status: 'done' } : r
      ),
    });
    setAssembling(false);
  };

  const handleDownload = () => {
    updateProduct(project.id, {
      ...product,
      roadmap: product.roadmap.map(r =>
        r.id === '7' ? { ...r, status: 'done' } : r
      ),
    });
  };

  return (
    <div className="p-6 space-y-4">
      <ProgressBar current={6} />
      <h1 className="text-2xl font-bold mb-4">Монтаж для {product.name}</h1>

      {scenes.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto">
          {scenes.map((s, i) => (
            <div key={s.id} className="w-48 flex-shrink-0">
              <video src={s.url} className="w-full" controls />
              <p className="text-center text-sm">Сцена {i + 1}</p>
            </div>
          ))}
        </div>
      )}

      {!finalUrl && (
        <button
          onClick={assemble}
          disabled={assembling || scenes.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {assembling ? 'Собираем...' : 'Собрать видео'}
        </button>
      )}

      {finalUrl && (
        <div className="space-y-4">
          <video src={finalUrl} controls className="w-full rounded" />
          <a
            href={finalUrl}
            download
            onClick={handleDownload}
            className="inline-block bg-brandTurquoise text-white px-4 py-2 rounded"
          >
            Скачать видео
          </a>
        </div>
      )}
    </div>
  );
}
