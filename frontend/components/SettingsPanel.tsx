interface Props {
  apiKeys: Record<string, string>
  onChange: (keys: Record<string, string>) => void
}

export default function SettingsPanel({ apiKeys, onChange }: Props) {
  return (
    <div className="bg-white shadow p-4 rounded space-y-2">
      <h3 className="font-semibold">Настройки API ключей</h3>
      {Object.entries(apiKeys).map(([key, val]) => (
        <div key={key} className="flex items-center space-x-2">
          <label className="w-24 capitalize">{key}</label>
          <input
            className="border rounded px-2 py-1 flex-1"
            value={val}
            onChange={e => onChange({ ...apiKeys, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  )
}
