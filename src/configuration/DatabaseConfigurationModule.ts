import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountTable1679150991642 } from '../migrations/1679150991642-AccountTable';
import { TransactionTable1679407774277 } from '../migrations/1679407774277-TransactionTable';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATASOURCE_HOST'),
        port: configService.get<number>('DATASOURCE_PORT'),
        username: configService.get<string>('DATASOURCE_USERNAME'),
        password: configService.get<string>('DATASOURCE_PASSWORD'),
        database: configService.get<string>('DATASOURCE_NAME'),
        synchronize: false,
        migrations: [AccountTable1679150991642, TransactionTable1679407774277], // Change to pass the path instead individually migrations
        migrationsRun: true,
        migrationsTableName: 'database_migrations',
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfigurationModule {}
