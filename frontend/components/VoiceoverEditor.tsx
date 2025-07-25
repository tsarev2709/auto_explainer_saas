interface Props {
  text: string
  onChange: (t: string) => void
}

export default function VoiceoverEditor({ text, onChange }: Props) {
  return (
    <div>
      <label className="block mb-1">Текст закадрового голоса</label>
      <textarea
        className="w-full border rounded px-2 py-1"
        value={text}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
