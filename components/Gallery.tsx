'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getGalleryData } from '@/lib/data'

export default function Gallery() {
  const galleryData = getGalleryData()
  const [activeCategory, setActiveCategory] = useState('all')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredImages =
    activeCategory === 'all'
      ? galleryData.images
      : galleryData.images.filter((img) => img.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Create unique floating animation for each image
  // Using deterministic values based on index for consistent animations
  const getFloatingVariants = (index: number) => {
    const offset = (index % 3) * 0.3 // Vary between 0, 0.3, 0.6
    const amplitude = 8 + (index % 3) * 2 // Vary between 8, 10, 12
    const duration = 3 + (index % 3) * 0.5 // Vary between 3, 3.5, 4
    const xOffset = Math.sin(index * 0.5) * 2
    
    return {
      float: {
        y: [0, -amplitude, 0],
        x: [0, xOffset, 0],
        transition: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.1 + offset,
        },
      },
    }
  }

  return (
    <section id="gallery" className="section-dark section-lg relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)`,
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
              {galleryData.subtitle}
            </p>
            <h2 className="text-display text-display-2 text-primary-light mb-8">
              {galleryData.title}
            </h2>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {galleryData.categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 text-body font-medium rounded-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary-accent text-primary-dark'
                      : 'bg-primary-gray-dark text-primary-light/70 hover:text-primary-light hover:bg-primary-gray-dark/80'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-sm bg-primary-gray-dark border border-primary-gray-dark hover:border-primary-accent/50 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Floating Animation Container */}
                  <motion.div
                    className="absolute inset-0"
                    variants={getFloatingVariants(index)}
                    animate="float"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain p-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-body text-body-sm text-primary-light font-medium">
                      {image.alt}
                    </p>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-primary-accent/0 group-hover:bg-primary-accent/5 transition-all duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-body text-body-lg text-primary-light/60">
                Изображения в этой категории отсутствуют
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
