# Платформа репетитора

Монорепозиторий проекта. Существующий сайт Next.js расположен в `apps/web`.
Каталоги `apps/api` и `packages/contracts` подготовлены для будущего API и общих контрактов; код в них пока не создан.

## Локальный запуск сайта

Нужны Node.js и pnpm 11.25.0.

```bash
pnpm install
pnpm dev:web
```

Сайт откроется на http://localhost:3000. Проверки: `pnpm lint:web` и `pnpm build:web`.

`apps/web` собирается и развёртывается отдельно от будущего `apps/api`.
