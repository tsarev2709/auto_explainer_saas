import Head from 'next/head'
import Hero from '../components/Hero'
import BackgroundAnimation from '../components/BackgroundAnimation'
import FeatureBlock from '../components/FeatureBlock'
import Footer from '../components/Footer'

const features = [
  { icon: '🤖', title: 'Автоматический сценарий', description: 'ИИ напишет текст за вас' },
  { icon: '🖌️', title: 'AI-картинки и анимация', description: 'Генерируем яркие визуалы' },
  { icon: '🎙️', title: 'Озвучка и музыка', description: 'Профессиональный звук' },
  { icon: '📈', title: 'Видео, которое продаёт', description: 'Повышайте конверсии' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Auto Explainer</title>
      </Head>
      <div className="relative overflow-hidden">
        <BackgroundAnimation />
        <Hero />
        <section id="features" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-4xl mx-auto">
          {features.map((f) => (
            <FeatureBlock key={f.title} {...f} />
          ))}
        </section>
        <Footer />
      </div>
    </>
  )
}
