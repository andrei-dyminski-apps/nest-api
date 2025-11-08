import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDataBaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'better-sqlite3',
  database: configService.get<string>('DB_DATABASE', 'database.sqlite'),
  synchronize: configService.getOrThrow<string>('DB_SYNCHRONIZE') === 'true',
  logging: configService.getOrThrow<string>('NODE_ENV') === 'development',
  autoLoadEntities: true,
});
