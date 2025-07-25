import { motion } from "framer-motion";
import BackgroundAnimation from "./BackgroundAnimation";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Hero() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    router.push(session ? '/dashboard' : '/auth');
  };
  return (
    <section className="relative flex flex-col justify-center items-center h-screen text-center px-4 bg-gradient-to-br from-[#40E0D0] to-[#C084FC] text-white">
      <BackgroundAnimation />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Сгенерируй explainer-видео для своего бизнеса за 2 минуты
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg md:text-2xl mb-6"
      >
        AI сам напишет сценарий, нарисует и озвучит
      </motion.p>
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-300 transition"
      >
        Создать видео
      </motion.button>
    </section>
  );
}
