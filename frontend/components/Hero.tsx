import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl mb-4"
      >
        Создавай explainer-видео с ИИ за 2 минуты
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl md:text-2xl mb-8"
      >
        Вводишь сайт — получаешь стильный ролик
      </motion.p>
      <motion.a
        href="#features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-brandYellow text-black px-6 py-3 rounded-full font-semibold"
      >
        Попробовать бесплатно
      </motion.a>
    </section>
  )
}
