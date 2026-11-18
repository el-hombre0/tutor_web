import dataSource from './data-source.js';
import { seedDemoData } from './seed.js';

if (process.env.NODE_ENV === 'production') throw new Error('Demo data cannot be seeded in production');
const host = process.env.POSTGRES_HOST ?? '127.0.0.1';
if (!['127.0.0.1', 'localhost', '::1'].includes(host)) throw new Error('Demo data can only be seeded in a local database');
await dataSource.initialize();
try {
  await dataSource.transaction(seedDemoData);
  console.log('Demo data added.');
} finally {
  await dataSource.destroy();
}
