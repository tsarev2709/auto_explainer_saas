import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  icon: string
  title: string
  description: string
}

export default function FeatureBlock({ icon, title, description }: Props) {
  return (
    <motion.div
      className="bg-white/10 p-6 rounded-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-200">{description}</p>
    </motion.div>
  )
}
