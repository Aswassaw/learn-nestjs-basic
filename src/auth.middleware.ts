import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { User } from './database/entities/User';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly orm: MikroORM) {}

  async use(req: any, res: any, next: () => void) {
    const username = req.headers['x-username'];
    if (!username) {
      throw new BadRequestException('Unauthorized');
    }

    const emFork = this.orm.em.fork();
    const userRepo = emFork.getRepository(User);
    const user = await userRepo.findOne({
      firstName: username,
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new BadRequestException('Unauthorized');
    }
  }
}
