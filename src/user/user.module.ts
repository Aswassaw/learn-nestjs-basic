import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from './connection';
import { mailSerbice, MailService } from './mail/mail.service';
import { createUserRepo, UserRepository } from './user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: Connection,
    //   useClass:
    //     process.env.DATABASE === 'mysql' ? MySQLConnection : MongoDBConnection,
    // },
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: mailSerbice,
    },
    {
      provide: UserRepository,
      useFactory: createUserRepo,
      inject: [Connection],
    },
    {
      provide: 'EMAIL_ALIAS_COBA_BRO',
      useExisting: MailService,
    },
    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
