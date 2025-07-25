interface Style {
  id: string
  url: string
}

interface Props {
  styles: Style[]
  selected?: string
  onSelect: (id: string) => void
}

export default function StyleGallery({ styles, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {styles.map(style => (
        <button
          type="button"
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={`rounded overflow-hidden border ${selected === style.id ? 'border-brandViolet' : 'border-transparent'}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={style.url} alt="style" className="w-full h-20 object-cover" />
        </button>
      ))}
    </div>
  )
}

