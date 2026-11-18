import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from './database/config.js';
import { DatabaseModule } from './database/database.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseHealth, PostgresHealth } from './database-health.js';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => ({ ...databaseOptions(process.env), retryAttempts: 1 }) }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService, { provide: DatabaseHealth, useClass: PostgresHealth }],
})
export class AppModule {}
