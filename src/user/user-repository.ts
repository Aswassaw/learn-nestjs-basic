import { Connection } from './connection';

export class UserRepository {
  connection: Connection;

  save() {
    console.log(`save user with connection ${this.connection.getName()}`);
  }
}

export function createUserRepo(connection: Connection): UserRepository {
  const repo = new UserRepository();
  repo.connection = connection;

  return repo;
}
