import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingService } from './logging/logging.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, LoggingService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  it('should accept a structured log', () => {
    expect(appController.log({ level: 'warn', message: 'slow request', requestId: 'r-1' })).toEqual({
      accepted: true,
      level: 'warn',
      message: 'slow request',
    });
  });
});
