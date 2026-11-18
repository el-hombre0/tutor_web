import { Suspense } from 'react';
import { getHealth } from '../../lib/health';

async function HealthStatus() {
  const health = await getHealth(process.env.API_URL ?? 'http://127.0.0.1:3001', fetch);
  return (
    <dl className="mt-6 space-y-3 text-base" aria-live="polite">
      <div className="flex justify-between gap-8"><dt>API</dt><dd>{health.api === 'up' ? 'Работает' : 'Недоступен'}</dd></div>
      <div className="flex justify-between gap-8"><dt>База данных</dt><dd>{health.database === 'up' ? 'Подключена' : health.database === 'down' ? 'Недоступна' : 'Неизвестно'}</dd></div>
    </dl>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-indigo-700">Платформа репетитора</p>
        <h1 className="mt-2 text-3xl font-semibold">Состояние системы</h1>
        <p className="mt-3 text-slate-600">Проверка связи с сервером и базой данных.</p>
        <Suspense fallback={<p className="mt-6" role="status">Проверяем подключение…</p>}>
          <HealthStatus />
        </Suspense>
        <p className="mt-8 text-sm text-slate-500">Обновите страницу, чтобы проверить состояние ещё раз.</p>
      </section>
    </main>
  );
}
