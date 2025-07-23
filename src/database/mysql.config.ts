import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

const configService = new ConfigService();

const mysqlConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  charset: 'utf8mb4_unicode_ci',
  migrationsRun: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/src/database/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migrations',
  extra: {
    connectionLimit: 50,
  },
};

export default mysqlConfig;
