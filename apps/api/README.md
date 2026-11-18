# Tutor API

NestJS API приложения. Для локального запуска из корня репозитория:

```bash
pnpm install
pnpm dev:api
```

При локальном запуске Nest CLI загружает корневой `.env`. По умолчанию сервер слушает порт `3001`; его можно изменить переменной `API_PORT` (целое число от 1 до 65535). В других окружениях переменная передаётся процессу при запуске.
`GET http://localhost:3001/health` проверяет процесс API и подключение к PostgreSQL запросом `SELECT 1`:

- HTTP 200: `{"api":"up","database":"up"}`;
- HTTP 503: `{"api":"up","database":"down"}`.

Для проверки используются `POSTGRES_HOST` (по умолчанию `127.0.0.1`), `POSTGRES_PORT` (по умолчанию `5432`), `POSTGRES_DB`, `POSTGRES_USER` и `POSTGRES_PASSWORD` из корневого `.env`. При запуске API в контейнере задайте `POSTGRES_HOST=postgres`.

Проверки из корня: `pnpm build:api`, `pnpm lint:api`, `pnpm test:api`, `pnpm test:e2e:api`.
