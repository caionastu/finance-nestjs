import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { AccountModule } from '../accounts/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
