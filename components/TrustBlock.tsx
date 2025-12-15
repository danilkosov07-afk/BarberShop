'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getTrustData } from '@/lib/data'

export default function TrustBlock() {
  const trustData = getTrustData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="trust" className="section-light section-lg relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 70%)`,
      }} />
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <p className="text-body text-body-lg text-primary-accent mb-6 font-bold tracking-wider uppercase">
              {trustData.subtitle}
            </p>
            <h2 className="text-display text-display-2 text-primary-dark mb-8">
              {trustData.title}
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24">
            {trustData.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-primary-dark/5 rounded-sm border border-primary-gray-light/20 hover:border-primary-accent/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="text-display text-display-3 text-primary-accent font-bold mb-4"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-display text-h4 text-primary-dark mb-2 font-semibold">
                  {stat.label}
                </h3>
                <p className="text-body text-body-sm text-primary-dark/60">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div>
            <motion.h3
              className="text-display text-h2 text-primary-dark text-center mb-16"
              variants={itemVariants}
            >
              Что говорят наши клиенты
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {trustData.testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="p-10 bg-primary-dark text-primary-light rounded-sm border border-primary-gray-dark hover:border-primary-accent/50 transition-all duration-300 relative shadow-xl hover:shadow-2xl hover:shadow-primary-accent/10"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-primary-accent/15">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-primary-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-body text-body-lg text-primary-light/90 mb-10 leading-relaxed relative z-10">
                    {testimonial.text}
                  </p>

                  {/* Author */}
                  <div className="border-t border-primary-gray-dark pt-8">
                    <p className="text-display text-h4 text-primary-light font-semibold mb-2">
                      {testimonial.name}
                    </p>
                    <p className="text-body text-body text-primary-light/60">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
