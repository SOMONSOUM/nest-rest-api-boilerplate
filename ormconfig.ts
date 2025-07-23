import mysqlConfig from 'src/database/mysql.config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  ...mysqlConfig,
});
