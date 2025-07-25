import { motion } from "framer-motion";

export default function ScaryBlock() {
  return (
    <motion.section
      id="scary-block"
      className="bg-white text-gray-900 py-20 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ты теряешь клиентов
      </h2>
      <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
        Если ты до сих пор объясняешь свой бизнес с помощью текстов и
        презентаций — ты теряешь деньги.
        <br />
        Люди не читают. Люди не понимают. Люди уходят.
        <br />
        Хватит объяснять сложно — объясни красиво. Сгенерируй видео — уже
        сегодня.
      </p>
    </motion.section>
  );
}
