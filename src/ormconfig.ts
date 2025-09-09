import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'project_db',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'database', 'migrations', '*{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  extra: {
    max: 10,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
