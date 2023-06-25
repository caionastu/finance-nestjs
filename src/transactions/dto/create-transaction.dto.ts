import { IsDateString, IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { TransactionType } from '../entity/transaction.type';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'Account Id ust not be empty.' })
  accountId: string;
  @IsPositive({ message: 'Value must higher than 0.' })
  @IsNotEmpty({ message: 'Value must not be empty.' })
  value: number;
  @IsDateString()
  @IsNotEmpty({ message: 'Date must not be empty.' })
  date: Date;
  @IsNotEmpty({ message: 'Type must not be empty.' })
  @IsEnum(TransactionType, { message: 'Invalid transaction type' })
  type: TransactionType;
  category: string;
  description?: string;
}
