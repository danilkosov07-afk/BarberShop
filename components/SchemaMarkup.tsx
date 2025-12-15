import { getSiteData } from '@/lib/data'

export default function SchemaMarkup() {
  const siteData = getSiteData()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://barber-premium.ru'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#organization`,
    name: siteData.meta.siteName,
    description: siteData.meta.siteDescription,
    url: siteUrl,
    telephone: siteData.contacts.info.phone.value,
    email: siteData.contacts.info.email.value,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.contacts.info.address.value,
      addressLocality: 'Москва',
      addressCountry: 'RU',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    priceRange: '$$',
    image: `${siteUrl}/images/og-image.jpg`,
    sameAs: siteData.contacts.social.map((social) => social.url),
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Barber Shop Services',
    provider: {
      '@id': `${siteUrl}#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Москва',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги барбершопа',
      itemListElement: siteData.services.items.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
        price: service.price,
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        position: index + 1,
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'О нас',
        item: `${siteUrl}#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Услуги',
        item: `${siteUrl}#services`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Контакты',
        item: `${siteUrl}#contacts`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
