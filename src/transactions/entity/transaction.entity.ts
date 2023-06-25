import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionType } from './transaction.type';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ name: 'account_id' })
  accountId: string;
  @Column()
  value: number;
  @Column()
  date: Date;
  @Column()
  category: string;
  @Column()
  type: TransactionType;
  @Column()
  description?: string;

  public static from(createTransactionDto: CreateTransactionDto): Transaction {
    return {
      accountId: createTransactionDto.accountId,
      value: createTransactionDto.value,
      date: createTransactionDto.date,
      category: createTransactionDto.category,
      type: createTransactionDto.type,
      description: createTransactionDto.description,
    };
  }
}
