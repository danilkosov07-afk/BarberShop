# Структура данных сайта

Все текстовые данные сайта хранятся в файле `site.json` и загружаются через утилиты из `lib/data.ts`.

## Структура данных

### Hero блок
```typescript
{
  hero: {
    title: string
    subtitle: string
    description: string
    cta: { primary, secondary }
    image: string
  }
}
```

### О барбершопе
```typescript
{
  about: {
    title: string
    subtitle: string
    description: string
    features: Array<{ icon, title, description }>
    image: string
  }
}
```

### Услуги
```typescript
{
  services: {
    title: string
    subtitle: string
    items: Array<{
      id: string
      name: string
      description: string
      price: string
      duration: string
      image: string
    }>
  }
}
```

### Преимущества
```typescript
{
  advantages: {
    title: string
    subtitle: string
    items: Array<{
      id: string
      title: string
      description: string
      icon: string
    }>
  }
}
```

### Галерея
```typescript
{
  gallery: {
    title: string
    subtitle: string
    images: Array<{
      id: string
      src: string
      alt: string
      category: string
    }>
  }
}
```

### CTA блок
```typescript
{
  cta: {
    title: string
    subtitle: string
    description: string
    button: { text, href }
    image: string
  }
}
```

### Контакты
```typescript
{
  contacts: {
    title: string
    subtitle: string
    info: {
      address, phone, email, hours
    }
    social: Array<{ name, url, icon }>
    map: { embed, link }
  }
}
```

### Футер
```typescript
{
  footer: {
    copyright: string
    links: Array<{ title, href }>
    legal: Array<{ title, href }>
  }
}
```

## Использование

```typescript
import { getHeroData, getServicesData } from '@/lib/data'

export default function Hero() {
  const hero = getHeroData()
  
  return (
    <section>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
      <button>{hero.cta.primary.text}</button>
    </section>
  )
}
```

## Редактирование

Все тексты можно редактировать напрямую в файле `site.json`. Изменения применятся автоматически после перезагрузки страницы в режиме разработки.

