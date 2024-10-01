import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { User } from './database/entities/User';
import { EntityManager, EntityRepository } from '@mikro-orm/mariadb';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const username = req.headers['x-username'];
    if (!username) {
      throw new BadRequestException('Unauthorized');
    }

    const user = await this.userRepository.findOne({
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
