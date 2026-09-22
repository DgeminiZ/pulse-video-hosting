# Pulse Backend

Учебный бэкенд видеохостинга **Pulse** (аналог YouTube) на NestJS. Реализует часть требований из SRS: создание/просмотр/редактирование/удаление видео, счётчик просмотров, лайки/дизлайки, комментарии.

Данные хранятся **в памяти** (массив) — при перезапуске сервера сбрасываются. Для учебного проекта этого достаточно.

## Требования к окружению

- Node.js 20+ (рекомендуется 22)
- pnpm 10+

## Установка и запуск

```bash
# 1. Установить зависимости
pnpm install

# 2. Запустить в режиме разработки (порт 3000)
pnpm run start:dev

# либо production-сборка
pnpm run build
pnpm run start:prod
```

Сервер слушает `http://localhost:3000`, все маршруты с префиксом `/api`.

Проверить, что сервер работает:

```
GET http://localhost:3000/api  →  "Pulse API is running!"
```

## Структура проекта

```
backend/
├── src/
│   ├── main.ts               # точка входа, ValidationPipe, префикс /api
│   ├── app.module.ts         # корневой модуль
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── videos/
│   │   ├── entities/         # Video entity + категории/статусы
│   │   ├── dto/              # CreateVideoDto, UpdateVideoDto, LikeVideoDto
│   │   ├── videos.service.ts # бизнес-логика (массив в памяти)
│   │   ├── videos.controller.ts
│   │   └── videos.module.ts
│   └── comments/
│       ├── entities/         # Comment entity
│       ├── dto/              # CreateCommentDto
│       ├── comments.service.ts
│       ├── comments.controller.ts
│       └── comments.module.ts
├── test-evidence.http        # готовые запросы (REST Client)
├── TEST_LOG.md               # доказательства работы (лог реальных запросов)
└── README.md
```

## API

### Видео

| Метод | Маршрут | Описание |
|-------|---------|----------|
| `POST` | `/api/videos` | Создать видео (FR-2.5) |
| `GET` | `/api/videos` | Список всех видео |
| `GET` | `/api/videos/:id` | Видео по id, инкремент счётчика просмотров (FR-3.4) |
| `PATCH` | `/api/videos/:id` | Обновить метаданные (FR-2.5) |
| `DELETE` | `/api/videos/:id` | Удалить видео (FR-6.2) |
| `POST` | `/api/videos/:id/reaction` | Лайк/дизлайк (FR-4.1) |

Тело для `POST /api/videos`:

```json
{
  "title": "Моё первое видео",
  "description": "Описание",
  "category": "Education"
}
```

`category` — одно из: `Design`, `Technology`, `Travel`, `Music`, `Education`, `Gaming`, `Other`.

Тело для `PATCH /api/videos/:id` — любые из полей `title`, `description`, `category`, `status` (`published` | `hidden`).

Тело для реакции:

```json
{ "type": "like" }
```

`type` — `like` или `dislike`. Повторная такая же реакция отменяет её, противоположная — заменяет.

### Комментарии

| Метод | Маршрут | Описание |
|-------|---------|----------|
| `POST` | `/api/videos/:videoId/comments` | Добавить комментарий (FR-4.2) |
| `GET` | `/api/videos/:videoId/comments` | Список комментариев к видео (FR-4.2) |

Тело для комментария:

```json
{
  "author": "Даниил",
  "text": "Отличное видео!"
}
```

## Обработка ошибок

Используются стандартные исключения NestJS:

- `NotFoundException` (404) — видео/комментарий не найден
- `BadRequestException` (400) — невалидные данные (ValidationPipe), лишние поля, неизвестный тип реакции

Ответ ошибки:

```json
{ "message": "Video with id \"...\" not found", "error": "Not Found", "statusCode": 404 }
```

## Валидация входящих данных

Глобальный `ValidationPipe` в `main.ts`:

- `whitelist: true` — отбрасывает неописанные в DTO поля
- `forbidNonWhitelisted: true` — 400 при лишних полях
- `transform: true` — приведение типов

Ограничения:
- `title` — строка, непустая, до 100 символов
- `description` — до 5000 символов
- `author` — до 50 символов
- `text` — 1–1000 символов

## Требования SRS, реализованные в учебном проекте

- **FR-2.5** — создание и редактирование метаданных видео
- **FR-3.4** — учёт просмотров (инкремент при GET по id)
- **FR-4.1** — лайки/дизлайки с переключением и отменой
- **FR-4.2** — комментарии (создание, список)
- **FR-6.2** — удаление видео

## Доказательства работы

- `test-evidence.http` — готовые запросы для REST Client
- `TEST_LOG.md` — реальные запросы и ответы, выполненные с сервера
