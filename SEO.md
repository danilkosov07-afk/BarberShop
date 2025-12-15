# SEO и Оптимизация

## Реализованные улучшения

### Meta-теги
- ✅ Полные meta-теги в `app/layout.tsx`
- ✅ Title с шаблоном для страниц
- ✅ Description из данных сайта
- ✅ Keywords
- ✅ Authors, Creator, Publisher
- ✅ Format Detection (отключено для email/phone/address)

### OG-теги (Open Graph)
- ✅ Open Graph для социальных сетей
- ✅ Twitter Card
- ✅ OG изображения
- ✅ Locale (ru_RU)

### Schema.org разметка
- ✅ LocalBusiness schema (`components/SchemaMarkup.tsx`)
- ✅ Service schema с каталогом услуг
- ✅ BreadcrumbList schema
- ✅ Все данные из `site.json`

### Оптимизация шрифтов
- ✅ Использование `next/font/google` с оптимизацией
- ✅ Preload для критических шрифтов
- ✅ Font-display: swap
- ✅ Fallback шрифты
- ✅ Поддержка латиницы и кириллицы

### Lazy Loading
- ✅ Все изображения в галерее используют `loading="lazy"`
- ✅ Изображения в About, CTA, Services используют lazy loading
- ✅ Hero изображение использует `priority` (критическое)

### Next.js оптимизация
- ✅ Компрессия включена
- ✅ SWC minify
- ✅ Оптимизация CSS
- ✅ ETags генерация
- ✅ Удален powered-by header
- ✅ Оптимизированные размеры изображений

### SEO файлы
- ✅ `app/robots.ts` - robots.txt
- ✅ `app/sitemap.ts` - sitemap.xml
- ✅ `app/manifest.ts` - Web App Manifest

## Переменные окружения

Создайте файл `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Проверка build

Для проверки сборки выполните:

```bash
npm run build
```

Проект должен собраться без ошибок.

## Готовность к деплою на Vercel

✅ Все файлы настроены
✅ SEO оптимизация завершена
✅ Оптимизация производительности
✅ Lazy loading реализован
✅ Schema.org разметка добавлена

## Дополнительные шаги для продакшена

1. Добавьте реальное OG изображение в `/public/images/og-image.jpg` (1200x630px)
2. Добавьте favicon в `/public/favicon.ico`
3. Настройте переменные окружения в Vercel
4. Добавьте коды верификации в `app/layout.tsx` (Google Search Console, Yandex Webmaster)
