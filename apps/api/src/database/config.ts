import type { DataSourceOptions } from 'typeorm';
import { UserEntity, RoleEntity, TutorStudentEntity, SchoolClassEntity, RefreshSessionEntity } from './entities.js';
import { InitialSchema1730000000000 } from './migrations/1730000000000-initial-schema.js';

/** Builds PostgreSQL configuration without changing the schema automatically. */
export function databaseOptions(env: NodeJS.ProcessEnv): DataSourceOptions {
  const port = Number(env.POSTGRES_PORT ?? 5432);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid POSTGRES_PORT');
  return { type: 'postgres', host: env.POSTGRES_HOST ?? '127.0.0.1', port, username: env.POSTGRES_USER, password: env.POSTGRES_PASSWORD, database: env.POSTGRES_DB, entities: [UserEntity, RoleEntity, TutorStudentEntity, SchoolClassEntity, RefreshSessionEntity], migrations: [InitialSchema1730000000000], synchronize: false, migrationsRun: false };
}
