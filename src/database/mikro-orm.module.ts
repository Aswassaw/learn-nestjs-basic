import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/User';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
