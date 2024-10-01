import { EntityManager, EntityRepository } from '@mikro-orm/mariadb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { User } from 'src/database/entities/User';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async onModuleInit() {
    console.log('DIMULAI!!!');
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async save(firstName: string, lastName: string) {
    this.userRepository.create({ firstName, lastName });
    await this.em.flush();
  }

  async onModuleDestroy() {
    console.log('SELESAI!');
  }
}
