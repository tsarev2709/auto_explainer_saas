export const steps = ['Бизнес-анализ', 'Сценарий', 'Визуальный стиль', 'Кадры', 'Анимация', 'Озвучка', 'Финал']

export default function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex space-x-2 text-sm mb-4">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center">
          <span className={idx === current ? 'font-semibold text-brandViolet' : ''}>{step}</span>
          {idx < steps.length - 1 && <span className="mx-2 text-gray-400">&rarr;</span>}
        </div>
      ))}
    </div>
  )
}
