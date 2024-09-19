import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property({ length: 50 })
  firstName: string;

  @Property({ length: 50, nullable: true })
  lastName?: string;
}
