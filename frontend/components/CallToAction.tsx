import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <motion.section
      className="bg-gradient-to-r from-[#40E0D0] to-[#C084FC] text-white py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Создай своё видео прямо сейчас
      </h2>
      <a
        href="/app"
        className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition"
      >
        Попробовать бесплатно
      </a>
    </motion.section>
  );
}
