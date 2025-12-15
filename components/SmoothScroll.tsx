'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Проверка, что код выполняется только на клиенте
    if (typeof window === 'undefined') return

    let lenis: any = null
    let rafId: number | null = null
    let handleAnchorClick: ((e: MouseEvent) => void) | null = null

    // Динамический импорт Lenis только на клиенте
    import('lenis').then((LenisModule) => {
      const Lenis = LenisModule.default || LenisModule
      
      // Инициализация Lenis с премиальными настройками
      lenis = new Lenis({
        duration: 1.8, // Увеличена длительность для более медленной прокрутки
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная easing функция
        orientation: 'vertical' as const,
        gestureOrientation: 'vertical' as const,
        smoothWheel: true,
        wheelMultiplier: 0.5, // Уменьшен множитель для более медленной прокрутки колесиком
        touchMultiplier: 1.0, // Более медленная прокрутка на тач-устройствах
        infinite: false,
      })

      // Функция для анимации прокрутки
      function raf(time: number) {
        if (lenis) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
      }

      rafId = requestAnimationFrame(raf)

      // Обработка якорных ссылок через делегирование событий
      handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const anchor = target.closest('a[href^="#"]')
        
        if (anchor && lenis) {
          const href = anchor.getAttribute('href')
          if (href && href !== '#') {
            e.preventDefault()
            const targetId = href.replace('#', '')
            const element = document.getElementById(targetId)
            
            if (element) {
              lenis.scrollTo(element, {
                offset: -80, // Учет высоты header
                duration: 2.2, // Более медленная прокрутка к якорям
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              })
            }
          } else if (href === '#') {
            // Прокрутка наверх
            e.preventDefault()
            lenis.scrollTo(0, {
              duration: 2,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }
        }
      }

      document.addEventListener('click', handleAnchorClick, true)

      // Сброс прокрутки при смене страницы
      lenis.scrollTo(0, { immediate: true })
    })

    // Cleanup функция
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (lenis) {
        lenis.destroy()
      }
      if (handleAnchorClick) {
        document.removeEventListener('click', handleAnchorClick, true)
      }
    }
  }, [pathname])

  return null
}
