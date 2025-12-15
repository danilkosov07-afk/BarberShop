'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Инициализация Lenis с премиальными настройками
    const lenis = new Lenis({
      duration: 1.8, // Увеличена длительность для более медленной прокрутки
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная easing функция
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.5, // Уменьшен множитель для более медленной прокрутки колесиком
      touchMultiplier: 1.0, // Более медленная прокрутка на тач-устройствах
      infinite: false,
    })

    // Функция для анимации прокрутки
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Обработка якорных ссылок через делегирование событий
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          const targetId = href.replace('#', '')
          const element = document.getElementById(targetId)
          
          if (element) {
            lenis.scrollTo(element, {
              offset: -80, // Учет высоты header
              duration: 2.2, // Более медленная прокрутка к якорям
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }
        } else if (href === '#') {
          // Прокрутка наверх
          e.preventDefault()
          lenis.scrollTo(0, {
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick, true)

    // Сброс прокрутки при смене страницы
    lenis.scrollTo(0, { immediate: true })

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick, true)
    }
  }, [pathname])

  return null
}
