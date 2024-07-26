import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
};

const dataSource = new DataSource(options);

export default dataSource;
