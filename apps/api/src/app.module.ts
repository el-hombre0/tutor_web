import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseHealth, PostgresHealth } from './database-health.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, { provide: DatabaseHealth, useClass: PostgresHealth }],
})
export class AppModule {}
