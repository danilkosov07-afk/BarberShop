import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Премиальный барбершоп',
    short_name: 'Barber Premium',
    description: 'Премиальный барбершоп в Москве. Профессиональные стрижки, бритье и уход за бородой.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0B',
    theme_color: '#F59E0B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
