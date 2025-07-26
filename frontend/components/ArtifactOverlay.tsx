interface Props {
  frames: number[]
  totalFrames: number
}

export default function ArtifactOverlay({ frames, totalFrames }: Props) {
  return (
    <div className="relative h-2 bg-gray-200 rounded">
      {frames.map(f => (
        <div
          key={f}
          style={{ left: `${(f / totalFrames) * 100}%` }}
          className="absolute top-0 bottom-0 w-1 bg-red-600"
        />
      ))}
    </div>
  )
}
