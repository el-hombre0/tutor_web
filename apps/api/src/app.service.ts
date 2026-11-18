import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseHealth } from './database-health.js';

@Injectable()
export class AppService {
  constructor(private readonly databaseHealth: DatabaseHealth) {}

  /** Returns API and database state, failing readiness when the database is unavailable. */
  async getHealth(): Promise<{ api: 'up'; database: 'up' }> {
    try {
      await this.databaseHealth.ping();
      return { api: 'up', database: 'up' };
    } catch {
      throw new ServiceUnavailableException({ api: 'up', database: 'down' });
    }
  }
}
