import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { getHealth } from './health.ts';

test('reports healthy API and database', async () => {
  const fetcher = async () => new Response(JSON.stringify({ api: 'up', database: 'up' }), { status: 200 });
  assert.deepEqual(await getHealth('http://localhost:3001', fetcher), { api: 'up', database: 'up' });
});

test('reports database failure returned with 503', async () => {
  const fetcher = async () => new Response(JSON.stringify({ api: 'up', database: 'down' }), { status: 503 });
  assert.deepEqual(await getHealth('http://localhost:3001', fetcher), { api: 'up', database: 'down' });
});

test('reports unavailable API when request fails or response is invalid', async () => {
  const failed = async (): Promise<Response> => { throw new Error('offline'); };
  const invalid = async () => new Response('{}');
  assert.deepEqual(await getHealth('http://localhost:3001', failed), { api: 'down', database: 'unknown' });
  assert.deepEqual(await getHealth('http://localhost:3001', invalid), { api: 'down', database: 'unknown' });
});
