interface Props {
  selected: number
  total: number
  disabled?: boolean
  onNext: () => void
}

export default function FooterProgress({ selected, total, disabled, onNext }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner p-4 flex justify-between items-center">
      <span>
        Выбрано {selected} из {total} ключевых кадров
      </span>
      <button
        onClick={onNext}
        disabled={disabled}
        className="bg-brandTurquoise text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Перейти к этапу анимации
      </button>
    </div>
  )
}

