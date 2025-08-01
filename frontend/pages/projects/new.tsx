import React from 'react';
import { useRouter } from 'next/router';
import ProjectForm, { FormData } from '../../components/ProjectForm';
import { useUser } from '../../lib/useUser';

export function NewProject({ isPro, onSuccess }: { isPro: boolean; onSuccess?: () => void }) {
  const handleSubmit = async (data: FormData) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok && onSuccess) onSuccess();
  };

  return <ProjectForm onSubmit={handleSubmit} isPro={isPro} />;
}

export default function NewProjectPage() {
  const router = useRouter();
  const user = useUser();

  return <NewProject isPro={!!user.pro} onSuccess={() => router.push('/projects')} />;
}
