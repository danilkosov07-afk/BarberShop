'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { getAboutData } from '@/lib/data'

const iconMap: Record<string, string> = {
  scissors: '✂️',
  tools: '🔧',
  atmosphere: '✨',
  service: '👔',
}

export default function About() {
  const aboutData = getAboutData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  return (
    <section id="about" className="section-dark section-lg relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
      }} />
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-body text-body-lg text-primary-accent mb-6 font-bold tracking-wider uppercase"
              variants={itemVariants}
            >
              {aboutData.subtitle}
            </motion.p>
            <motion.h2
              className="text-display text-display-2 mb-10"
              variants={itemVariants}
            >
              {aboutData.title}
            </motion.h2>
            <motion.p
              className="text-body text-body-lg text-primary-light/80 mb-12 text-pretty leading-relaxed"
              variants={itemVariants}
            >
              {aboutData.description}
            </motion.p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {aboutData.features.map((feature, index) => (
                <motion.div
                  key={feature.icon}
                  className="group p-8 bg-primary-gray-dark/50 rounded-sm border border-primary-gray-dark hover:border-primary-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-accent/10"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[feature.icon] || '✨'}
                  </div>
                  <h3 className="text-display text-h4 mb-3 text-primary-light font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-body text-body text-primary-light/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#contacts"
                onClick={(e) => handleAnchorClick(e, '#contacts')}
                className="btn-primary text-lg px-10 py-5 inline-block"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(245, 158, 11, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                Записаться на консультацию
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative aspect-[4/5] rounded-sm overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-gray-dark to-primary-dark" />
            <Image
              src={aboutData.image}
              alt={aboutData.title}
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
