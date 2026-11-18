import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppController } from './../src/app.controller.js';
import { AppService } from './../src/app.service.js';
import { DatabaseHealth } from './../src/database-health.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let ping: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    ping = vi.fn().mockResolvedValue(undefined);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: DatabaseHealth, useValue: { ping } }],
    })
      .overrideProvider(DatabaseHealth)
      .useValue({ ping })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET) reports a healthy database', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ api: 'up', database: 'up' });
  });

  it('/health (GET) reports an unavailable database', () => {
    ping.mockRejectedValue(new Error('connection failed'));
    return request(app.getHttpServer())
      .get('/health')
      .expect(503)
      .expect({ api: 'up', database: 'down' });
  });

  afterEach(async () => {
    await app.close();
  });
});
