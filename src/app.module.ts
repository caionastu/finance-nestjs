import { Module } from '@nestjs/common';
import { AccountModule } from './accounts/account.module';
import { TransactionModule } from './transactions/transaction.module';
import { DatabaseConfigurationModule } from './configuration/DatabaseConfigurationModule';
import { EnvironmentVariablesConfigurationModule } from './configuration/EnvironmentVariablesConfigurationModule';

@Module({
  imports: [
    EnvironmentVariablesConfigurationModule,
    DatabaseConfigurationModule,
    AccountModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
