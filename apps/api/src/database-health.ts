import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

/** Contract for checking whether the database accepts queries. */
export abstract class DatabaseHealth {
  /** Executes a lightweight database check. */
  abstract ping(): Promise<void>;
}

@Injectable()
export class PostgresHealth extends DatabaseHealth {
  /** Checks that PostgreSQL can execute a simple query. */
  async ping(): Promise<void> {
    const client = new Client({
      host: process.env.POSTGRES_HOST ?? '127.0.0.1',
      port: Number(process.env.POSTGRES_PORT ?? 5432),
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      connectionTimeoutMillis: 1000,
      query_timeout: 1000,
    });

    try {
      await client.connect();
      await client.query('SELECT 1');
    } finally {
      await client.end();
    }
  }
}
