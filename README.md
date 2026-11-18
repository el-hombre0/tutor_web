# Платформа репетитора

Монорепозиторий проекта: Next.js в `apps/web`, NestJS API в `apps/api`.
`packages/contracts` подготовлен для будущих общих контрактов.

Интерфейс сайта разрабатывается с Tailwind CSS, компонентами shadcn/ui в `apps/web/components/ui` и иконками Lucide. Конфигурация shadcn/ui находится в `apps/web/components.json`.

## Локальный запуск сайта

Нужны Node.js 22.22.3+ (либо 24.15+ или 26+) и pnpm 11.25.0.

```bash
pnpm install
pnpm dev:web
pnpm dev:api
```

Сайт откроется на http://localhost:3000, API — на http://localhost:3001.
Проверка API и подключения к БД: http://localhost:3001/health.
Страница `/status` показывает результат этой проверки. Сервер Next.js обращается к `http://127.0.0.1:3001`; если API расположен на другом адресе, задайте `API_URL` в `apps/web/.env.local` (например, `API_URL=http://127.0.0.1:3001`).
Команды `dev:web` и `dev:api` запускаются в отдельных терминалах.

Проверки сайта: `pnpm lint:web`, `pnpm build:web`.
Проверки API: `pnpm lint:api`, `pnpm build:api`, `pnpm test:api`, `pnpm test:e2e:api`.

`apps/web` и `apps/api` собираются и развёртываются отдельно.

## Локальная база данных

PostgreSQL 17 запускается отдельно от приложений через Docker Compose:

```bash
cp .env.example .env
# Укажите собственный POSTGRES_PASSWORD в .env перед запуском
docker compose up -d postgres
docker compose ps
```

База доступна с компьютера по `127.0.0.1:5432` (порт можно изменить в `.env`).
Имя БД, пользователь и пароль указаны в `.env`. Из другого контейнера Compose адрес сервиса — `postgres:5432`.
В этом же `.env` можно настроить `API_PORT` для локального запуска NestJS; по умолчанию это `3001`. Next.js пока не использует переменные окружения.
Данные сохраняются в именованном томе `postgres_data` между перезапусками контейнера.

Проверить подключение и остановить базу:

```bash
docker compose exec postgres pg_isready -U tutor -d tutor
docker compose down
```

`docker compose down -v` удаляет том и все локальные данные БД. API подключается к БД через TypeORM. Перед первым запуском примените миграцию: `pnpm build:api`, затем `pnpm --filter tutor-api migration:run`. Подробнее — в `apps/api/README.md`.
