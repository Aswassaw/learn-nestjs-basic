import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './database/mikro-orm.module';
import { ValidationModule } from './validation/validation.module';

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
export class AppModule {}
