interface Props {
  text: string
  onChange: (t: string) => void
}

export default function RationaleBox({ text, onChange }: Props) {
  return (
    <div>
      <label className="block mb-1">Обоснование сценария</label>
      <textarea
        className="w-full border rounded px-2 py-1"
        value={text}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
