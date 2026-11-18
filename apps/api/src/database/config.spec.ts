import { describe, expect, it } from 'vitest';
import { databaseOptions } from './config.js';

describe('databaseOptions', () => {
  it('uses the configured PostgreSQL connection without automatic schema changes', () => {
    const options = databaseOptions({ POSTGRES_HOST: 'db', POSTGRES_PORT: '5433', POSTGRES_DB: 'school', POSTGRES_USER: 'teacher', POSTGRES_PASSWORD: 'secret' });
    expect(options).toMatchObject({ type: 'postgres', host: 'db', port: 5433, database: 'school', username: 'teacher', password: 'secret', synchronize: false });
  });
  it('rejects an invalid database port', () => {
    expect(() => databaseOptions({ POSTGRES_PORT: '0' })).toThrow('POSTGRES_PORT');
  });
});
