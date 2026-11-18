import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /** Returns a healthy status while the API process is running. */
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
