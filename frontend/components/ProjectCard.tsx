import Link from 'next/link';
import { Project } from '../lib/store';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.id}`} className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-1">{project.companyName}</h3>
      {project.sphere && <p className="text-sm text-gray-500 mb-1">{project.sphere}</p>}
      <p className="text-xs text-gray-400">{new Date(project.createdAt).toLocaleDateString()}</p>
    </Link>
  );
}
