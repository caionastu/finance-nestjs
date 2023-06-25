import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/entity/transaction.entity';
import { TransactionType } from '../transactions/entity/transaction.type';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async findAll(): Promise<Account[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Account> {
    const account = await this.repository.findOneBy({
      id: id,
    });

    if (account == null) {
      throw new NotFoundException(`Account not find by id ${id}.`);
    }

    return account;
  }
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = Account.from(createAccountDto);
    await this.repository.save(account);
    this.logger.log(`Account created with id ${account.id}`);
    return account;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account: Account = await this.findById(id);
    return this.repository.save({ ...account, name: updateAccountDto.name });
  }

  async delete(id: string): Promise<void> {
    const existTransaction = await this.transactionRepository.exist({
      where: {
        accountId: id,
      },
    });

    if (existTransaction) {
      throw new UnprocessableEntityException(
        `Cannot delete account with id ${id}, because there are transactions related to this account. Delete them first and try again.`,
      );
    }
    await this.repository.delete(id);
  }

  async add(transaction: Transaction): Promise<void> {
    const account = await this.findById(transaction.accountId);

    let balance = account.balance;
    switch (transaction.type) {
      case TransactionType.EXPENSE:
        balance -= Math.abs(transaction.value);
        break;
      case TransactionType.REVENUE:
        balance += Math.abs(transaction.value);
        break;
    }

    await this.repository.update(transaction.accountId, { balance: balance });
  }

  async remove(transaction: Transaction): Promise<void> {
    const account = await this.findById(transaction.accountId);

    let balance = account.balance;
    switch (transaction.type) {
      case TransactionType.EXPENSE:
        balance += Math.abs(transaction.value);
        break;
      case TransactionType.REVENUE:
        balance -= Math.abs(transaction.value);
        break;
    }

    await this.repository.update(transaction.accountId, { balance: balance });
  }
}
