import { Migration } from '@mikro-orm/migrations';

export class Migration20240919094035 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null, \`first_name\` varchar(50) not null, \`last_name\` varchar(50) null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`user\`;`);
  }

}
