interface Props {
  value: string
  onChange: (val: string) => void
}

const generators = [
  { id: 'kling', title: 'Kling' },
  { id: 'wav2.1', title: 'Wav 2.1' }
]

export default function GeneratorSelect({ value, onChange }: Props) {
  return (
    <select
      className="border rounded px-2 py-1"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {generators.map(g => (
        <option key={g.id} value={g.id}>
          {g.title}
        </option>
      ))}
    </select>
  )
}
