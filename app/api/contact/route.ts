import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, contact, message } = body

    // Валидация на сервере
    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Имя должно содержать минимум 2 символа' },
        { status: 400 }
      )
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Сообщение должно содержать минимум 10 символов' },
        { status: 400 }
      )
    }

    // Валидация email или телефона
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    const cleanPhone = contact.replace(/\s/g, '')
    
    const isValidEmail = emailRegex.test(contact)
    const isValidPhone = phoneRegex.test(cleanPhone) && cleanPhone.length >= 10

    if (!isValidEmail && !isValidPhone) {
      return NextResponse.json(
        { error: 'Введите корректный email или телефон' },
        { status: 400 }
      )
    }

    // Здесь можно добавить отправку email, сохранение в БД и т.д.
    // Для mock просто симулируем задержку
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Логирование в консоль (в продакшене это должно быть в логах)
    console.log('Contact form submission:', {
      name,
      contact,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Сообщение успешно отправлено',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при обработке запроса' },
      { status: 500 }
    )
  }
}
