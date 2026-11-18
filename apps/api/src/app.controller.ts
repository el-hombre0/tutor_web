import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** Returns API and database status. */
  @Get('health')
  getHealth(): Promise<{ api: 'up'; database: 'up' }> {
    return this.appService.getHealth();
  }
}
