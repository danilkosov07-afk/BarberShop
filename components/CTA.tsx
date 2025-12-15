'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { getCTAData } from '@/lib/data'

export default function CTA() {
  const ctaData = getCTAData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="cta" className="relative section-dark section overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-gray-dark to-primary-dark" />
          <Image
            src={ctaData.image}
            alt={ctaData.title}
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary-dark/80 to-primary-dark/90" />
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            className="text-body text-body-lg text-primary-accent mb-6 font-bold tracking-wider uppercase"
            variants={itemVariants}
          >
            {ctaData.subtitle}
          </motion.p>

          <motion.h2
            className="text-display text-display-2 text-primary-light mb-8 text-balance"
            variants={itemVariants}
          >
            {ctaData.title}
          </motion.h2>

          <motion.p
            className="text-body text-body-lg text-primary-light/80 mb-12 text-pretty max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {ctaData.description}
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.a
              href={ctaData.button.href}
              onClick={(e) => handleAnchorClick(e, ctaData.button.href)}
              className="btn-primary text-xl px-14 py-7 inline-block font-bold shadow-2xl shadow-primary-accent/30"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(245, 158, 11, 0.4)', y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {ctaData.button.text}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements - Enhanced */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-primary-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-accent/3 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
