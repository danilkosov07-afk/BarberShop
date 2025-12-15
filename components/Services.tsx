'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { getServicesData } from '@/lib/data'

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

const serviceCardImages = [
  '/images/service-card-1.svg',
  '/images/service-card-2.svg',
  '/images/service-card-3.svg',
]

export default function Services() {
  const servicesData = getServicesData()
  const displayedServices = servicesData.items.slice(0, 3)
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="services" className="section-light section-lg relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none" style={{
        backgroundImage: `linear-gradient(45deg, rgba(245, 158, 11, 0.02) 25%, transparent 25%),
                          linear-gradient(-45deg, rgba(245, 158, 11, 0.02) 25%, transparent 25%)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            variants={cardVariants}
          >
            <p className="text-body text-body-lg text-primary-accent mb-6 font-bold tracking-wider uppercase">
              {servicesData.subtitle}
            </p>
            <h2 className="text-display text-display-2 text-primary-dark mb-8">
              {servicesData.title}
            </h2>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12 mb-20">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="group relative bg-primary-dark rounded-sm overflow-hidden border border-primary-gray-light/10 hover:border-primary-accent/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-accent/20"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Card Image/Illustration */}
                <div className="relative h-64 bg-primary-gray-dark overflow-hidden">
                  {serviceCardImages[index] ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={serviceCardImages[index]}
                        alt={service.name}
                        fill
                        className="object-contain p-4 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-gray-dark to-primary-dark flex items-center justify-center">
                      <span className="text-6xl opacity-30">💇</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <h3 className="text-display text-h3 text-primary-light mb-4 group-hover:text-primary-accent transition-colors font-semibold">
                    {service.name}
                  </h3>
                  <p className="text-body text-body text-primary-light/70 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between pt-6 border-t border-primary-gray-dark">
                    <span className="text-display text-h4 text-primary-accent font-bold">
                      {service.price}
                    </span>
                    <span className="text-body text-body text-primary-light/60">
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary-accent/0 group-hover:bg-primary-accent/5 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            variants={cardVariants}
          >
            <motion.a
              href="#contacts"
              onClick={(e) => handleAnchorClick(e, '#contacts')}
              className="btn-primary text-lg px-12 py-6 inline-block"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(245, 158, 11, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              Записаться на услугу
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
