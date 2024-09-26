import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './database/mikro-orm.module';
import { ValidationModule } from './validation/validation.module';
import { LogMiddleware } from './log/log.middleware';
import { HelloMiddleware } from './middleware/hello.middleware';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OrmModule,
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.align(),
        winston.format.printf((info) => `${info.level}: ${info.message}`),
      ),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    ValidationModule.forRoot(true),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes(
      {
        path: '/user',
        method: RequestMethod.GET,
      },
      {
        path: '/user',
        method: RequestMethod.POST,
      },
    );

    consumer.apply(HelloMiddleware).forRoutes(UserController);
  }
}
