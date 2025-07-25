import { RoadmapStep } from '../lib/store';

export default function RoadmapStepView({ step }: { step: RoadmapStep }) {
  const statusColor = step.status === 'done' ? 'text-green-600' : step.status === 'in_progress' ? 'text-yellow-600' : 'text-gray-500';
  return (
    <div className="flex items-center space-x-2">
      <span className={statusColor}>●</span>
      <span>{step.title}</span>
    </div>
  );
}
