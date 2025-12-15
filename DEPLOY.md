# Инструкция по деплою на Vercel

## Подготовка к деплою

### 1. Переменные окружения

Создайте файл `.env.local` или настройте в Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 2. Необходимые файлы

Убедитесь, что добавлены:
- `/public/images/og-image.jpg` (1200x630px) - для OG тегов
- `/public/favicon.ico` - иконка сайта

### 3. Проверка build

Перед деплоем проверьте сборку:

```bash
npm install
npm run build
```

Если сборка успешна, проект готов к деплою.

## Деплой на Vercel

### Через GitHub/GitLab/Bitbucket:

1. Загрузите код в репозиторий
2. Подключите репозиторий к Vercel
3. Настройте переменные окружения в настройках проекта
4. Деплой произойдет автоматически

### Через Vercel CLI:

```bash
npm i -g vercel
vercel
```

## После деплоя

1. Проверьте работу сайта
2. Проверьте `/robots.txt` и `/sitemap.xml`
3. Добавьте сайт в Google Search Console и Yandex Webmaster
4. Добавьте коды верификации в `app/layout.tsx` (опционально)

## Проверка SEO

После деплоя проверьте:
- Meta теги через [Open Graph Debugger](https://www.opengraph.xyz/)
- Schema.org через [Google Rich Results Test](https://search.google.com/test/rich-results)
- Скорость загрузки через [PageSpeed Insights](https://pagespeed.web.dev/)
