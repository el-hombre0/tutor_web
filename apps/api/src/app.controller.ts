import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** Returns the API process status. */
  @Get('health')
  getHealth(): { status: string } {
    return this.appService.getHealth();
  }
}
