import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';

@Entity()
export class Account {
  constructor(
    name: string,
    balance: number,
    id?: string,
    number?: number,
    branch?: number,
    bankCode?: number,
  ) {
    this.name = name;
    this.balance = balance;
    this.id = id;
    this.number = number;
    this.branch = branch;
    this.bankCode = bankCode;
  }

  @PrimaryGeneratedColumn('uuid')
  public readonly id?: string;
  @Column()
  public readonly name: string;
  @Column()
  public readonly balance: number;
  @Column()
  public readonly number?: number;
  @Column()
  public readonly branch?: number;
  @Column({ name: 'bank_code' })
  public readonly bankCode?: number;

  public static from(createAccountDto: CreateAccountDto): Account {
    return new Account(
      createAccountDto.name,
      createAccountDto.balance,
      undefined,
      createAccountDto.number,
      createAccountDto.branch,
      createAccountDto.bankCode,
    );
  }
}
