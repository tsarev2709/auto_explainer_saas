import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProjectForm, { FormData } from '../../../components/ProjectForm';
import { useUser } from '../../../lib/useUser';

interface EditProps {
  id: string;
  isPro: boolean;
  onSuccess?: () => void;
}

export function EditProject({ id, isPro, onSuccess }: EditProps) {
  const [initial, setInitial] = useState<FormData | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data) setInitial(data);
      });
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok && onSuccess) onSuccess();
  };

  if (!initial) return <p className="p-6">Загрузка...</p>;

  return <ProjectForm initial={initial} onSubmit={handleSubmit} isPro={isPro} />;
}

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const user = useUser();
  if (!id) return null;
  return <EditProject id={id} isPro={!!user.pro} onSuccess={() => router.push('/projects')} />;
}
