import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'techwondoe',
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/**/*.migration{.ts,.js}'],
  subscribers: ['dist/src/**/*.subscriber{.ts,.js}'],
  cli: {
    migrationsDir: 'dist/src/migrations',
  },
  synchronize: true,
};

export default config;
