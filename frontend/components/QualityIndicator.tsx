interface Props {
  score: number
}

export default function QualityIndicator({ score }: Props) {
  const color = score > 80 ? 'bg-green-500' : score > 60 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="w-full space-y-1">
      <div className="relative h-2 bg-gray-200 rounded overflow-hidden">
        <div style={{ width: `${score}%` }} className={`${color} h-2`} />
      </div>
      <span className="text-sm">Качество: {score}/100</span>
    </div>
  )
}
