'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getHeroData } from '@/lib/data'

export default function Hero() {
  const heroData = getHeroData()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
      }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="relative w-full h-[120%]">
          {/* Background Gradient Fallback with Texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-gray-dark to-primary-dark" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)`,
          }} />
          
          {/* Background Image */}
          <Image
            src={heroData.image}
            alt={heroData.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          
          {/* Multi-layer Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary-dark/75 to-primary-dark/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 via-transparent to-primary-dark/60" />
          <div className="absolute inset-0 bg-primary-dark/30" />
          
          {/* Animated Light Effects */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-accent/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-accent/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container-custom text-center px-4"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <motion.p
            className="text-body text-body-lg text-primary-accent mb-8 font-bold tracking-[0.3em] uppercase"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroData.subtitle}
          </motion.p>
        </motion.div>

        {/* Main Title - Extra Large */}
        <motion.h1
          className="text-display text-display-1 text-primary-light mb-8 font-bold text-balance leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {heroData.title}
        </motion.h1>

        {/* Strong Offer */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.p
            className="text-display text-display-3 text-primary-accent font-bold mb-8 relative inline-block"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
          >
            <span className="relative z-10">{heroData.offer}</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-2 bg-primary-accent/20 -z-0"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-body text-body-lg text-primary-light/90 max-w-3xl mx-auto mb-16 text-pretty leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {heroData.description}
        </motion.p>

        {/* Trust Stats */}
        {heroData.trust && (
          <motion.div
            className="grid grid-cols-3 gap-12 max-w-5xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {Object.entries(heroData.trust).filter(([key]) => !key.includes('Label')).map(([key, value], index) => {
              const labelKey = `${key}Label` as keyof typeof heroData.trust
              const label = heroData.trust[labelKey]
              return (
                <motion.div
                  key={key}
                  className="text-center p-6 bg-primary-dark/20 rounded-sm border border-primary-accent/20 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                >
                  <div className="text-display text-display-3 text-primary-accent font-bold mb-3">
                    {value as string}
                  </div>
                  <div className="text-body text-body text-primary-light/80 uppercase tracking-wider font-medium">
                    {label as string}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* CTA Buttons - Larger */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href={heroData.cta.primary.href}
            onClick={(e) => handleAnchorClick(e, heroData.cta.primary.href)}
            className="btn-primary text-xl px-12 py-6 font-bold shadow-2xl shadow-primary-accent/30"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)',
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
          >
            {heroData.cta.primary.text}
          </motion.a>

          <motion.a
            href={heroData.cta.secondary.href}
            onClick={(e) => handleAnchorClick(e, heroData.cta.secondary.href)}
            className="btn-secondary text-xl px-12 py-6 font-bold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {heroData.cta.secondary.text}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 text-primary-light/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-caption uppercase tracking-wider font-medium">Прокрутите</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

