import { GeneratedImage } from '../lib/store'

interface Props {
  images: GeneratedImage[]
  selected?: GeneratedImage
  onSelect: (img: GeneratedImage) => void
}

export default function ImageVariants({ images, selected, onSelect }: Props) {
  if (!images || images.length === 0) return null
  return (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {images.map(img => (
        <button
          type="button"
          key={img.id}
          onClick={() => onSelect(img)}
          className={`rounded overflow-hidden border ${selected?.id === img.id ? 'border-brandViolet' : 'border-transparent'}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.url} alt="variant" className="w-full h-24 object-cover" />
        </button>
      ))}
    </div>
  )
}

