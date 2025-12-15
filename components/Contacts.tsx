'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { getContactsData } from '@/lib/data'

interface FormData {
  name: string
  contact: string
  message: string
}

interface FormErrors {
  name?: string
  contact?: string
  message?: string
}

export default function Contacts() {
  const contactsData = getContactsData()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    return /^[\d\s\-\+\(\)]+$/.test(phone.replace(/\s/g, '')) && phone.replace(/\s/g, '').length >= 10
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Телефон или email обязательны для заполнения'
    } else {
      const isEmail = validateEmail(formData.contact)
      const isPhone = validatePhone(formData.contact)
      if (!isEmail && !isPhone) {
        newErrors.contact = 'Введите корректный email или телефон'
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', contact: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

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

  const iconMap: Record<string, React.ReactNode> = {
    'map-pin': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    mail: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  return (
    <section id="contacts" className="section-light section-lg relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none" style={{
        backgroundImage: `linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, transparent 50%)`,
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
              {contactsData.subtitle}
            </p>
            <h2 className="text-display text-display-2 text-primary-dark mb-8">
              {contactsData.title}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                {Object.entries(contactsData.info).map(([key, info]) => (
                  <motion.a
                    key={key}
                    href={info.href || '#'}
                    className="group flex items-start gap-4 p-6 bg-primary-dark/5 rounded-sm border border-primary-gray-light/20 hover:border-primary-accent/50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-primary-accent mt-1 group-hover:scale-110 transition-transform duration-300">
                      {iconMap[info.icon] || iconMap.clock}
                    </div>
                    <div className="flex-1">
                      <p className="text-body text-body-sm text-primary-dark/60 mb-1 font-medium">
                        {info.label}
                      </p>
                      <p className="text-body text-body-lg text-primary-dark font-semibold">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-display text-h5 text-primary-dark mb-4">
                  Мы в соцсетях
                </h3>
                <div className="flex gap-4">
                  {contactsData.social.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-primary-dark text-primary-light rounded-sm hover:bg-primary-accent hover:text-primary-dark transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-body-sm font-semibold">
                        {social.name.charAt(0)}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <motion.label
                    htmlFor="name"
                    className="block text-body text-body-sm text-primary-dark mb-2 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Имя *
                  </motion.label>
                  <motion.input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-primary-light border-2 rounded-sm text-body text-body text-primary-dark placeholder-primary-dark/40 focus:outline-none transition-all duration-300 ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-primary-gray-light focus:border-primary-accent'
                    }`}
                    placeholder="Ваше имя"
                    whileFocus={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  />
                  {errors.name && (
                    <motion.p
                      className="mt-1 text-body text-body-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Contact Input */}
                <div>
                  <motion.label
                    htmlFor="contact"
                    className="block text-body text-body-sm text-primary-dark mb-2 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Телефон или Email *
                  </motion.label>
                  <motion.input
                    id="contact"
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleChange('contact', e.target.value)}
                    className={`w-full px-4 py-3 bg-primary-light border-2 rounded-sm text-body text-body text-primary-dark placeholder-primary-dark/40 focus:outline-none transition-all duration-300 ${
                      errors.contact
                        ? 'border-red-500'
                        : 'border-primary-gray-light focus:border-primary-accent'
                    }`}
                    placeholder="+7 (999) 123-45-67 или email@example.com"
                    whileFocus={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  />
                  {errors.contact && (
                    <motion.p
                      className="mt-1 text-body text-body-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.contact}
                    </motion.p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <motion.label
                    htmlFor="message"
                    className="block text-body text-body-sm text-primary-dark mb-2 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Сообщение *
                  </motion.label>
                  <motion.textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    className={`w-full px-4 py-3 bg-primary-light border-2 rounded-sm text-body text-body text-primary-dark placeholder-primary-dark/40 focus:outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-primary-gray-light focus:border-primary-accent'
                    }`}
                    placeholder="Ваше сообщение..."
                    whileFocus={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  />
                  {errors.message && (
                    <motion.p
                      className="mt-1 text-body text-body-sm text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Отправка...
                    </span>
                  ) : (
                    'Отправить сообщение'
                  )}
                </motion.button>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      className="p-4 bg-green-500/10 border border-green-500/50 rounded-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <p className="text-body text-body-sm text-green-600 font-medium">
                        Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="p-4 bg-red-500/10 border border-red-500/50 rounded-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <p className="text-body text-body-sm text-red-600 font-medium">
                        Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
