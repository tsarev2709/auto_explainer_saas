import { motion } from "framer-motion";

interface Props {
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export default function CaseCard({ title, problem, solution, result }: Props) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm mb-2">{problem}</p>
      <p className="text-sm mb-2">{solution}</p>
      <p className="text-sm font-semibold">{result}</p>
    </motion.div>
  );
}
