import { Migration } from '@mikro-orm/migrations';

export class Migration20241001034204 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add \`role\` varchar(10) not null default 'user';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`user\` drop column \`role\`;`);
  }

}
